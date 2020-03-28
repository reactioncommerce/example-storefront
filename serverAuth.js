const OAuth2Strategy = require("passport-oauth2");
const passport = require("passport");
const config = require("./config");
const logger = require("./lib/logger");

let baseUrl = config.CANONICAL_URL;
if (!baseUrl.endsWith("/")) baseUrl = `${baseUrl}/`;

const oauthRedirectUrl = `${baseUrl}callback`;
const oauthPostLogoutRedirectUrl = `${baseUrl}post-logout-callback`;

/* eslint-disable camelcase */
const storefrontHydraClient = {
  client_id: config.OAUTH2_CLIENT_ID,
  client_secret: config.OAUTH2_CLIENT_SECRET,
  grant_types: [
    "authorization_code",
    "refresh_token"
  ],
  post_logout_redirect_uris: [oauthPostLogoutRedirectUrl],
  redirect_uris: [oauthRedirectUrl],
  response_types: ["code", "id_token", "token"],
  scope: "offline openid",
  subject_type: "public",
  token_endpoint_auth_method: "client_secret_post"
};
/* eslint-enable camelcase */

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
      callbackURL: oauthRedirectUrl,
      state: true,
      scope: ["offline", "openid"]
    },
    (accessToken, refreshToken, params, profile, cb) => {
      cb(null, { accessToken, idToken: params.id_token });
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

  server.get("/change-password", (req, res) => {
    const { email } = req.query;

    let from = req.get("Referer");
    if (typeof from !== "string" || from.length === 0) {
      from = config.CANONICAL_URL;
    }

    let url = config.OAUTH2_IDP_PUBLIC_CHANGE_PASSWORD_URL;
    url = url.replace("EMAIL", encodeURIComponent(email || ""));
    url = url.replace("FROM", encodeURIComponent(from));

    res.redirect(url);
  });

  server.get("/logout", (req, res) => {
    req.session.redirectTo = req.get("Referer");

    const { idToken } = req.user || {};

    // Clear storefront session auth
    req.logout();

    if (idToken) {
      // Request log out of OAuth2 session
      res.redirect(`${config.OAUTH2_PUBLIC_LOGOUT_URL}?post_logout_redirect_uri=${oauthPostLogoutRedirectUrl}&id_token_hint=${idToken}`);
    } else {
      res.redirect(req.session.redirectTo || config.CANONICAL_URL);
    }
  });

  server.get("/post-logout-callback", (req, res) => {
    // After success, redirect to the page we came from originally
    res.redirect(req.session.redirectTo || "/");
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
  let adminUrl = config.OAUTH2_ADMIN_URL;
  if (!adminUrl.endsWith("/")) adminUrl = `${adminUrl}/`;

  const getClientResponse = await fetch(`${adminUrl}clients/${config.OAUTH2_CLIENT_ID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (![200, 404].includes(getClientResponse.status)) {
    logger.error(await getClientResponse.text());
    throw new Error(`Could not get Hydra client [${getClientResponse.status}]`);
  }

  if (getClientResponse.status === 200) {
    // Update the client to be sure it has the latest config
    logger.info("Updating Hydra client...");

    const updateClientResponse = await fetch(`${adminUrl}clients/${config.OAUTH2_CLIENT_ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storefrontHydraClient)
    });

    if (updateClientResponse.status === 200) {
      logger.info("OK: Hydra client updated");
    } else {
      logger.error(await updateClientResponse.text());
      throw new Error(`Could not update Hydra client [${updateClientResponse.status}]`);
    }
  } else {
    logger.info("Creating Hydra client...");

    const response = await fetch(`${adminUrl}clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storefrontHydraClient)
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
}

module.exports = { configureAuthForServer, createHydraClientIfNecessary };
