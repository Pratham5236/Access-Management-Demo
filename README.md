# Access Management Task

Auth demo for technical assessment

## Overall System

<img width="1109" height="1368" alt="Authentication App Demo" src="https://github.com/user-attachments/assets/cbb7583a-8e06-4a41-a74b-e3f3621396ef" />

## Authentication Flows

- **SAML**: `/login` -> Redirects to Keycloak SAML -> `/login/callback`.
- **OIDC**: `/login/oidc` -> PKCE Challenge -> Keycloak OIDC -> `/oidc/callback`.
- **UAE Pass**: `/login/uaepass` -> UAE Pass Staging -> `/login/uaepass/callback`.
- **Logout**: `/logout` -> Clears local session and Passport authentication.

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
