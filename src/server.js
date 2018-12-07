const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const compression = require("compression");
const nextApp = require("next");
const request = require("request");
const { useStaticRendering } = require("mobx-react");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const config = require("./config");
const { decodeOpaqueId } = require("./lib/utils/decoding");
const logger = require("./lib/logger");
const router = require("./routes");

// First create the NextJS app.
// Note that only `config` can be used here because the NextJS `getConfig()` does not
// return anything until after the NextJS app is initialized.
const app = nextApp({
  dev: config.isDev,
  dir: config.isProduction ? "./build/app" : "./src"
});

// This is needed to allow custom parameters (e.g. loginActions) to be included
// when requesting authorization. This is setup to allow only loginAction to pass through
OAuth2Strategy.prototype.authorizationParams = function (options = {}) {
  return { loginAction: options.loginAction };
};

useStaticRendering(true);

passport.use("oauth2", new OAuth2Strategy({
  authorizationURL: config.OAUTH2_AUTH_URL,
  tokenURL: config.OAUTH2_TOKEN_URL,
  clientID: config.OAUTH2_CLIENT_ID,
  clientSecret: config.OAUTH2_CLIENT_SECRET,
  callbackURL: config.OAUTH2_REDIRECT_URL,
  state: true,
  scope: ["offline"]
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, { accessToken });
}));

// The value passed to `done` here is stored on the session.
// We save the full user object in the session.
passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

// The value returned from `serializeUser` is passed in from the session here,
// to get the user. We save the full user object in the session.
passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    // We use a client-side cookie session instead of a server session so that there are no
    // issues when load balancing without sticky sessions.
    // https://www.npmjs.com/package/cookie-session
    server.use(cookieSession({
      // https://www.npmjs.com/package/cookie-session#options
      keys: [config.SESSION_SECRET],
      maxAge: config.SESSION_MAX_AGE_MS,
      name: "storefront-session"
    }));

    // http://www.passportjs.org/docs/configure/
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(cookieParser());

    server.get("/signin", (req, res, next) => {
      req.session.redirectTo = req.get("Referer");
      next(); // eslint-disable-line promise/no-callback-in-promise
    }, passport.authenticate("oauth2", { loginAction: "signin" }));

    server.get("/signup", (req, res, next) => {
      req.session.redirectTo = req.get("Referer");
      next(); // eslint-disable-line promise/no-callback-in-promise
    }, passport.authenticate("oauth2", { loginAction: "signup" }));

    // This endpoint handles OAuth2 requests (exchanges code for token)
    server.get("/callback", passport.authenticate("oauth2"), (req, res) => {
      // After success, redirect to the page we came from originally
      res.redirect(req.session.redirectTo || "/");
    });

    server.get("/logout/:userId", (req, res) => {
      const { id } = decodeOpaqueId(req.params.userId);
      request(`${config.OAUTH2_IDP_HOST_URL}logout?userId=${id}`, (error) => {
        if (error) {
          logger.error(`Error from OAUTH2_IDP_HOST_URL logout endpoint: ${error}. Check the HOST server settings`);
        }
        if (!error) {
          req.logout();
          res.redirect(req.get("Referer") || "/");
        }
      });
    });

    // Setup next routes
    const routeHandler = router.getRequestHandler(app);
    server.use(routeHandler);

    return server.listen(config.PORT, (err) => {
      if (err) throw err;
      logger.appStarted("localhost", config.PORT);
    });
  })
  .catch((ex) => {
    logger.error(ex.stack);
    process.exit(1);
  });

module.exports = app;
