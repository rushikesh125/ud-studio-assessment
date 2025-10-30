
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';
import dotenv from "dotenv"
dotenv.config()
const configurePassport = () => {
  // Google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id });
      if (!user) {
        user = await User.create({
          provider: 'google',
          providerId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
        });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  // GitHub
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id });
      if (!user) {
        user = await User.create({
          provider: 'github',
          providerId: profile.id,
          email: profile._json.email || `${profile.id}@github.com`,
          name: profile.displayName || profile.username,
          avatar: profile.photos[0]?.value,
        });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

 
};

export default configurePassport;