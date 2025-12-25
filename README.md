# Access Management Task

Auth demo for technical assessment

## Features

- **SAML 2.0**: Integration using `passport-saml`.
- **OIDC (OpenID Connect)**: Integration using `openid-client` with PKCE.
- **UAE Pass**: OAuth 2.0 implementation with UAE Pass.
- **User Federation**: Works with Keycloak linked to local LDAP (Only for SAML and IODC; separate instance).

## Setup

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Environment Variables**:
   ```env
   KEYCLOAK_ISSUER=http://localhost:8080/realms/demo-realm
   OIDC_CLIENT_ID=XXXXXXXXX
   OIDC_CLIENT_SECRET=XXXXXXXX
   OIDC_REDIRECT_URI=http://localhost:3000/oidc/callback
   ```
   
   ```env
   KEYCLOAK_ISSUER=https://auth.pratham.cloud/realms/demo-realm
   OIDC_CLIENT_ID=XXXXXXXXX
   OIDC_CLIENT_SECRET=XXXXXXXX
   OIDC_REDIRECT_URI=https://demo-app.pratham.cloud/oidc/callback
   ```

3. **Runing**:
   ```bash
   # Development
   bun dev

   # Production
   bun start
   ```

## Authentication Flows

- **SAML**: `/login` -> Redirects to Keycloak SAML -> `/login/callback`.
- **OIDC**: `/login/oidc` -> PKCE Challenge -> Keycloak OIDC -> `/oidc/callback`.
- **UAE Pass**: `/login/uaepass` -> UAE Pass Staging -> `/login/uaepass/callback`.
- **Logout**: `/logout` -> Clears local session and Passport authentication.
