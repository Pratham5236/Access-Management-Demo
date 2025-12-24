export const samlConfig = {
  path: '/login/callback',
  entryPoint: 'http://localhost:8080/realms/demo-realm/protocol/saml',
  issuer: 'demo-saml-sp',
  callbackUrl: 'http://localhost:3000/login/callback',
  cert: `-----BEGIN CERTIFICATE-----
MIICozCCAYsCBgGbTEY9RDANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDDApkZW1vLXJlYWxtMB4XDTI1MTIyMzE3MzIxMFoXDTM1MTIyMzE3MzM1MFowFTETMBEGA1UEAwwKZGVtby1yZWFsbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOOHE40UfdrK7+cSIp6OYia7yahRV8enFX++68P00Cmbu1Wz8bP2Iuii6kLHBPE5UnK54s0JFF71jIed0Xw2mWdqY6IEEV3ovcpX9BP6AXjyTwinXU7VfLWoQ3ygnQbJLmKdmdTLkwNkA5yxcPeXTRsitMBUUsTuEYbAvkNtonb4Y7D53WLNJmOTYvfVCRuo59InITI/M0d2sAFtzmRwT3bXumfTDh+DdIHuBFzKrsDqShVzo4v2QC80dWYjaxua0vDmQsmZDAeoxcyyAWljVQpBiKtb/o1k923t7ndlxbVXKg52f0QAaOX+cmqI+N0+gbU8Rz3as6p5zU2DZ9pSkpcCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAgroxS+5VvIVsw8mqo4cSOWhYt+u8/QomhjbSOuhUDBMCk8efIIOyu3SgKTN7N0F97MDP20sziAQ+gDRABEVRlBvshOSFiwth7aMk1bFsfD8O4HYqBNBi2CmUsasO0jUyFyZsqko4wznXg208pO4y0rwXPI6JeNjE2Gzf/Ium6WRF0yEUuL2252fJXvxLqKtpdApWr29Og1TlKimQ+espb5Mf+ZbQyts3PmvW8fAUDsGlDr9dt2oJDDscvlrZ0Jo2QfYQnZPl67yg3XiqxR7kJB2Pi3ca26mdiQDMTCiWjLfy4d/UlMGwOd3436Y4BsLiVuC+kBtInw/+P45zFzmRxw==
-----END CERTIFICATE-----
  `,
  // below if manual assignment is required. otherwise, I have already set nameId as email in keycloak so should work with null
  // identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
  identifierFormat: null,
  signatureAlgorithm: 'sha256' as const,
  digestAlgorithm: 'sha256' as const,
};
