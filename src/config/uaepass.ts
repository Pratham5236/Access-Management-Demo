import 'dotenv/config';

export const uaePassConfig = {
  authorizeUrl: 'https://stg-id.uaepass.ae/idshub/authorize',
  tokenUrl: 'https://stg-id.uaepass.ae/idshub/token',
  userInfoUrl: 'https://stg-id.uaepass.ae/idshub/userinfo',
  clientId: 'sandbox_stage',
  clientSecret: 'sandbox_stage',
  redirectUri: 'http://localhost:3000/login/uaepass/callback',
  scope: 'urn:uae:digitalid:profile:general',
  acrValues: 'urn:safelayer:tws:policies:authentication:level:low',
};
