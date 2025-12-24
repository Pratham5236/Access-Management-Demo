import 'express-session';

declare module 'express-session' {
  interface SessionData {
    oidc?: {
      codeVerifier?: string;
      state?: string;
      tokens?: {
        access_token: string;
        refresh_token?: string;
        id_token?: string;
        token_type?: string;
        expires_in?: number;
      };
      userinfo?: Record<string, any>;
    };
    uaePass?: {
      tokens?: any;
      userinfo?: any;
    };
  }
}
