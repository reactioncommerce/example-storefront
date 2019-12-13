const OAuth2Strategy = require("passport-oauth2");
const passport = require("passport");
const config = require("./config");
const { decodeOpaqueId } = require("./lib/utils/decoding");
const logger = require("./lib/logger");

// This is needed to allow custom parameters (e.g. loginActions) to be included
// when requesting authorization. This is setup to allow only loginAction to pass through
OAuth2Strategy.prototype.authorizationParams = function (options = {}) {
  return { loginAction: options.loginAction };
};

passport.use(
  "oauth2",
  new OAuth2Strategy(
    {
      authorizationURL: config.OAUTH2_AUTH_URL,
      tokenURL: config.OAUTH2_TOKEN_URL,
      clientID: config.OAUTH2_CLIENT_ID,
      clientSecret: config.OAUTH2_CLIENT_SECRET,
      callbackURL: config.OAUTH2_REDIRECT_URL,
      state: true,
      scope: ["offline"]
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, { accessToken });
    }
  )
);

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

/**
 * @summary Adds auth routes and middleware to an Express server
 * @param {Object} server The express server
 * @returns {undefined}
 */
function configureAuthForServer(server) {
  // http://www.passportjs.org/docs/configure/
  server.use(passport.initialize());
  server.use(passport.session());

  server.get(
    "/signin",
    (req, res, next) => {
      req.session.redirectTo = req.get("Referer");
      next(); // eslint-disable-line promise/no-callback-in-promise
    },
    passport.authenticate("oauth2", { loginAction: "signin" })
  );

  server.get(
    "/signup",
    (req, res, next) => {
      req.session.redirectTo = req.get("Referer");
      next(); // eslint-disable-line promise/no-callback-in-promise
    },
    passport.authenticate("oauth2", { loginAction: "signup" })
  );

  // This endpoint handles OAuth2 requests (exchanges code for token)
  server.get("/callback", passport.authenticate("oauth2"), (req, res) => {
    // After success, redirect to the page we came from originally
    res.redirect(req.session.redirectTo || "/");
  });

  server.get("/logout/:userId", (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
      next();
      return;
    }
    const { id } = decodeOpaqueId(req.params.userId);

    // Ask IDP to log us out
    fetch(`${config.OAUTH2_IDP_HOST_URL}logout-user?userId=${id}`)
      .then((logoutResponse) => {
        if (logoutResponse.status >= 400) {
          const message = `Error from OAUTH2_IDP_HOST_URL logout endpoint: ${logoutResponse.status}. Check the HOST server settings`;

          logger.error(message);
          res.status(logoutResponse.status).send(message);
          return;
        }
        // If IDP confirmed logout, clear login info on this side
        req.logout();
        res.redirect(req.get("Referer") || "/");
        return; // appease eslint consistent-return
      })
      .catch((error) => {
        logger.error(`Error while logging out: ${error}`);
        res.status(500).send(`Error while logging out: ${error.message}`);
      });
  });
}

/**
 * @summary Calls Hydra's endpoint to create an OAuth client for storefront
 *   if one does not already exist. This works because the Hydra admin port
 *   is exposed on the internal network. Ensure that it is not exposed to the
 *   public Internet in production.
 * @returns {Promise<undefined>} Nothing
 */
async function createHydraClientIfNecessary() {
  /* eslint-disable camelcase */
  const bodyEncoded = JSON.stringify({
    client_id: config.OAUTH2_CLIENT_ID,
    client_secret: config.OAUTH2_CLIENT_SECRET,
    grant_types: [
      "authorization_code",
      "refresh_token"
    ],
    jwks: {},
    redirect_uris: [config.OAUTH2_REDIRECT_URL],
    response_types: ["token", "code"],
    scope: "offline",
    subject_type: "public",
    token_endpoint_auth_method: "client_secret_post"
  });
  /* eslint-enable camelcase */

  let adminUrl = config.OAUTH2_ADMIN_URL;
  if (!adminUrl.endsWith("/")) adminUrl = `${adminUrl}/`;

  logger.info("Creating Hydra client...");

  const response = await fetch(`${adminUrl}clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyEncoded
  });

  switch (response.status) {
    case 200:
    // intentional fallthrough!
    // eslint-disable-line no-fallthrough
    case 201:
      logger.info("OK: Hydra client created");
      break;
    case 409:
      logger.info("OK: Hydra client already exists");
      break;
    default:
      logger.error(await response.text());
      throw new Error(`Could not create Hydra client [${response.status}]`);
  }
}

module.exports = { configureAuthForServer, createHydraClientIfNecessary };
