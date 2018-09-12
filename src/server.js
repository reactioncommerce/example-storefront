import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import nextApp from "next";
import { useStaticRendering } from "mobx-react";
import logger from "lib/logger";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import refresh from "passport-oauth2-refresh";
import { appPath, dev } from "./config";
import router from "./routes";

const app = nextApp({ dir: appPath, dev });
const routeHandler = router.getRequestHandler(app);

useStaticRendering(true);

passport.use("oauth2", new OAuth2Strategy({
  authorizationURL: process.env.OAUTH2_AUTH_URL,
  tokenURL: process.env.OAUTH2_TOKEN_URL,
  clientID: process.env.OAUTH2_CLIENT_ID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  callbackURL: process.env.OAUTH2_REDIRECT_URL,
  state: true,
  scope: ["offline", "openid"]
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, { accessToken, profile });
}));

passport.use("refresh", refresh);

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(session({ secret: process.env.PASSPORT_SESSION_SECRET, resave: false, saveUninitialized: true }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(cookieParser());

    // This endpoint initializes the OAuth2 request
    server.get("/auth2", passport.authenticate("oauth2"));

    // This endpoint handles OAuth2 requests (exchanges code for token)
    server.get("/callback", passport.authenticate("oauth2"), (req, res) => {
      // After success, redirect to the page we came from originally
      res.redirect("/");
    });

    // Setup next routes
    server.use(routeHandler);

    return server.listen(4000, (err) => {
      if (err) throw err;
      logger.appStarted("localhost", 4000);
    });
  })
  .catch((ex) => {
    logger.error(ex.stack);
    process.exit(1);
  });

export default app;
