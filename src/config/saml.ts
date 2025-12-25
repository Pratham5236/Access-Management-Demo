export const samlConfig = {
    path: '/login/callback',
    entryPoint: 'https://auth.pratham.cloud/realms/demo-realm/protocol/saml',
    issuer: 'demo-saml-sp',
    callbackUrl: 'https://demo-app.pratham.cloud/login/callback',
    cert: `-----BEGIN CERTIFICATE-----
MIICozCCAYsCBgGbVEM44TANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDDApkZW1vLXJlYWxtMB4XDTI1MTIyNTA2NDU1MFoXDTM1MTIyNTA2NDczMFowFTETMBEGA1UEAwwKZGVtby1yZWFsbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMSmPXtuM6xQ4u/vLZ63TbFaa2d+vMN1BvVxGONNarQJF4mE6ygS+kyZ8f7L2mqEM2TOVl994Az15gJIPmqQGRg/+lQg1WkS1+YflnFJzuojq3NAGVi9i5YAI/i4avP9DW0sZBpxq7xHZOFrtraZskBi4Kcja5+aaHD8qPKmtHzSgg/XhfFXyXqlR3DKTT0utNaK0YqlV0airJsStncsVjEp+IR/ZuMlF3fQsQL8Qqx54G47BfSbz1a3DbICuQVYdEfNcdYmdgU/bug8yT/WFWSLPFMbzfqAy6akTegnAwC8xAHtor7Qz+svLEmGBQk0cst/yXopP0st3B/9PzhtDkcCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAKRBklvgqUgzRbCKpSSw5BmJuoF1QgmI/mZznTw0szKGBtiriIdiOMshrPiGricvyYKyKaKDlY4Jd0WsNm5dRRa6JHXtTFiZpicO/Ee3Ju2QIRn5WYzesxpNTyAql+cqAJa/Aod3M8Dm+J6pjqDEn9R3q/Nqduz7uWoAQuhtsOamyJmjitrNjdF+mNnUsw8NVTM/w8jlBklQk9J7ew84FzsVWjYgkb21TXFDtuL5F2H+6rnYvBre5z9z7TU3CtSjrFSX6Z6ZoCXJ1NqsgDd0vD25ZXHU0DzQ/ozRya4E8x2nKXbMep8bgvPajgLKzEDZkgC5m3/Ot5qSLcIdti9jQxg==
-----END CERTIFICATE-----
  `,
    // below if manual assignment is required. otherwise, I have already set nameId as email in keycloak so should work with null
    // identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
    identifierFormat: null,
    signatureAlgorithm: 'sha256' as const,
    digestAlgorithm: 'sha256' as const,
};
