import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as oidc from 'openid-client';
import { oidcConfig } from '../config/oidc.ts';
import { uaePassConfig } from '../config/uaepass.ts';
import { getDiscoveryConfig, decodeIdToken } from '../utils/oidcClient.ts';

// SAML Login
export const loginSaml = passport.authenticate('saml');

// SAML Callback
export const samlCallback = [
  passport.authenticate('saml', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // console.log('User logged in:', (req.user as any).nameID);
    res.redirect('/profile');
  },
];

// OIDC Login
export const loginOidc = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const config = await getDiscoveryConfig();

    const codeVerifier = oidc.randomPKCECodeVerifier();
    const codeChallenge = await oidc.calculatePKCECodeChallenge(codeVerifier);

    const parameters: Record<string, string> = {
      redirect_uri: oidcConfig.redirectUri,
      scope: 'openid profile email',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    };

    const state = oidc.randomState();
    parameters.state = state;

    req.session.oidc = {
      codeVerifier,
      state,
    };

    const redirectTo = oidc.buildAuthorizationUrl(config, parameters);
    res.redirect(redirectTo.href);
  } catch (err) {
    next(err);
  }
};

// OIDC Callback
export const oidcCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const config = await getDiscoveryConfig();
    const sess = req.session.oidc;

    if (!sess?.codeVerifier || !sess?.state) {
      res.status(400).send('Missing OIDC session context');
      return;
    }

    const currentUrl = new URL(
      `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    );

    const tokens = await oidc.authorizationCodeGrant(config, currentUrl, {
      pkceCodeVerifier: sess.codeVerifier,
      expectedState: sess.state,
    });

    const idTokenClaims = decodeIdToken(tokens.id_token);

    const userinfo = await oidc.fetchUserInfo(
      config,
      tokens.access_token,
      idTokenClaims.sub,
    );

    req.session.oidc = {
      ...sess,
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        id_token: tokens.id_token,
        token_type: tokens.token_type,
        expires_in: tokens.expires_in,
      },
      userinfo,
    };

    res.redirect('/profile-oidc');
  } catch (err) {
    next(err);
  }
};

// UAE Pass Login
export const loginUaePass = (req: Request, res: Response) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: uaePassConfig.clientId,
    scope: uaePassConfig.scope,
    redirect_uri: uaePassConfig.redirectUri,
    acr_values: uaePassConfig.acrValues,
  });

  res.redirect(`${uaePassConfig.authorizeUrl}?${params.toString()}`);
};

// UAE Pass Callback
export const uaePassCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code missing');
  }

  try {
    const credentials = Buffer.from(
      `${uaePassConfig.clientId}:${uaePassConfig.clientSecret}`,
    ).toString('base64');

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: uaePassConfig.redirectUri,
      code: code as string,
    });

    // giving code to get token
    const tokenResponse = await fetch(uaePassConfig.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(
        `Token exchange failed: ${tokenResponse.status} ${errorText}`,
      );
    }

    const tokenData = await tokenResponse.json();

    // getting user info with the token
    let userinfo = {};
    if (tokenData.access_token) {
      const userInfoResponse = await fetch(uaePassConfig.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });

      if (userInfoResponse.ok) {
        userinfo = await userInfoResponse.json();
      } else {
        console.warn(
          'Failed to fetch user info',
          await userInfoResponse.text(),
        );
      }
    }

    req.session.uaePass = {
      tokens: tokenData,
      userinfo,
    };

    res.redirect('/profile-uaepass');
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.oidc = undefined;
  req.session.uaePass = undefined;

  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
