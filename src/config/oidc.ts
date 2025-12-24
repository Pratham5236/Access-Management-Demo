import 'dotenv/config';

if (!process.env.KEYCLOAK_ISSUER || !process.env.OIDC_CLIENT_ID || !process.env.OIDC_CLIENT_SECRET || !process.env.OIDC_REDIRECT_URI) {
  throw new Error('Missing OIDC environment variables');
}

export const oidcConfig = {
  issuerUrl: process.env.KEYCLOAK_ISSUER,
  clientId: process.env.OIDC_CLIENT_ID,
  clientSecret: process.env.OIDC_CLIENT_SECRET,
  redirectUri: process.env.OIDC_REDIRECT_URI,
};
