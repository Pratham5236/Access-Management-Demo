import { type Request, type Response } from 'express';

export const renderHome = (req: Request, res: Response) => {
  res.render('index', {
    user: req.user,
    oidcUser: req.session.oidc?.userinfo || null,
    uaePassUser: req.session.uaePass?.userinfo || null,
  });
};

export const renderProfile = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('profile', { user: req.user });
};

export const renderOidcProfile = (req: Request, res: Response) => {
  const oidcSession = req.session.oidc;
  if (!oidcSession?.userinfo) {
    return res.redirect('/');
  }

  res.render('profile-oidc', {
    user: oidcSession.userinfo,
  });
};

export const renderUaePassProfile = (req: Request, res: Response) => {
  const uaePassSession = req.session.uaePass;
  if (!uaePassSession?.userinfo) {
    return res.redirect('/');
  }

  res.render('profile-uaepass', {
    user: uaePassSession.userinfo,
  });
};
