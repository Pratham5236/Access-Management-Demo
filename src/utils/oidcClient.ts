import * as oidc from 'openid-client';
import { oidcConfig } from '../config/oidc.ts';

let discoveryConfig: oidc.Configuration;

export async function getDiscoveryConfig() {
  if (discoveryConfig) return discoveryConfig;

  discoveryConfig = await oidc.discovery(
    new URL(oidcConfig.issuerUrl),
    oidcConfig.clientId,
    {
      client_id: oidcConfig.clientId,
      client_secret: oidcConfig.clientSecret,
    },
    undefined,
    {
      execute: [oidc.allowInsecureRequests],
    },
  );

  return discoveryConfig;
}

export function decodeIdToken(idToken: string) {
  const [, payload] = idToken.split('.');
  const decoded = Buffer.from(payload, 'base64').toString('utf-8');
  return JSON.parse(decoded);
}
