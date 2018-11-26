const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const compression = require("compression");
const nextApp = require("next");
const request = require("request");
const { useStaticRendering } = require("mobx-react");
const logger = require("lib/logger");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const { decodeOpaqueId } = require("lib/utils/decoding");
const { appPath, dev } = require("./config");
const router = require("./routes");

const app = nextApp({ dir: appPath, dev });
const routeHandler = router.getRequestHandler(app);

// This is needed to allow custom parameters (e.g loginActions) to be included
// when requesting authorization. This is setup to allow only loginAction to pass through
OAuth2Strategy.prototype.authorizationParams = function (options = {}) {
  return { loginAction: options.loginAction };
};

useStaticRendering(true);

passport.use("oauth2", new OAuth2Strategy({
  authorizationURL: process.env.OAUTH2_AUTH_URL,
  tokenURL: process.env.OAUTH2_TOKEN_URL,
  clientID: process.env.OAUTH2_CLIENT_ID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  callbackURL: process.env.OAUTH2_REDIRECT_URL,
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

    const { SESSION_SECRET, SESSION_MAX_AGE_MS } = process.env;
    const maxAge = SESSION_MAX_AGE_MS ? Number(SESSION_MAX_AGE_MS) : 24 * 60 * 60 * 1000; // 24 hours

    // We use a client-side cookie session instead of a server session so that there are no
    // issues when load balancing without sticky sessions.
    // https://www.npmjs.com/package/cookie-session
    server.use(cookieSession({
      // https://www.npmjs.com/package/cookie-session#options
      keys: [SESSION_SECRET],
      maxAge,
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
      request(`${process.env.OAUTH2_IDP_HOST_URL}logout?userId=${id}`, (error) => {
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

module.exports = app;
