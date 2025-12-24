import passport from 'passport';
import { Strategy as SamlStrategy } from 'passport-saml';
import { samlConfig } from './saml.ts';

export function configurePassport() {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  passport.use(
    new SamlStrategy(
      samlConfig,
      (profile, done) => done(null, profile),
    ),
  );
}
