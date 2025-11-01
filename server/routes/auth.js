
import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.js';
import configurePassport from '../config/passport.js';
import { protect } from '../middleware/auth.js';

const authRouter = express.Router();
configurePassport(); 

const FRONTEND_URL = process.env.FRONTEND_URL;


// authRouter.get('/:provider', (req, res, next) => {
//   const { provider } = req.params;
//   passport.authenticate(provider, { scope: getScope(provider) })(req, res, next);
// });

const getScope = (provider) => {
  if (provider === 'google') return ['profile', 'email'];
  if (provider === 'github') return ['user:email'];
  return [];
};


authRouter.get('/:provider/callback',
  (req, res, next) => {
    console.log('Callback hit for provider:', req.params.provider);
    passport.authenticate(req.params.provider, { session: false }, (err, user, info) => {
      console.log('Passport result:', { err, user: user?._id, info });

      if (err) {
        console.error('OAuth Error:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`);
      }
      if (!user) {
        console.log('No user – likely denied consent or invalid state');
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
      }

      // Success
      const token = generateToken(user);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect(`${process.env.FRONTEND_URL}/`);
    })(req, res, next);
  }
);


authRouter.get('/me',protect, (req, res) => {
  res.json({ user: req.user });
});


authRouter.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
});

export default authRouter;