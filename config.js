/**
 * All config needed for the app should be parsed from environment variables in this file.
 * This goes for config needed in server code as well as config needed in browser code.
 * - If the config is needed in a Node js file, you should import it directly from here.
 * - If the config is needed in browser code, which may sometimes be executed in a browser
 *   and sometimes be executed on the server, you should import the config from here into
 *   next.config.js and add it to `env`.
 */
const envalid = require("envalid");

const { bool, num, port, str, url } = envalid;

/**
 * See https://www.npmjs.com/package/envalid
 *
 * Envalid parses NODE_ENV automatically, and provides the following
 * shortcut (boolean) properties for checking its value:
 *   env.isProduction    // true if NODE_ENV === 'production'
 *   env.isTest          // true if NODE_ENV === 'test'
 *   env.isDevelopment   // true if NODE_ENV === 'development'
 *
 * Be sure to add `{ default: null }` if it should be optional.
 */
module.exports = envalid.cleanEnv(process.env, {
  CANONICAL_URL: url(),
  ENABLE_SPA_ROUTING: bool({ default: true }), // must explicitly set to false to disable
  BUILD_GRAPHQL_URL: url(),
  EXTERNAL_GRAPHQL_URL: url(),
  INTERNAL_GRAPHQL_URL: url(),
  NODE_ENV: str({ choices: ["development", "test", "jesttest", "production"], default: "production" }),
  OAUTH2_ADMIN_URL: str(),
  OAUTH2_AUTH_URL: url(),
  OAUTH2_CLIENT_ID: str(),
  OAUTH2_CLIENT_SECRET: str(),
  OAUTH2_IDP_PUBLIC_CHANGE_PASSWORD_URL: url(),
  OAUTH2_IDP_HOST_URL: url(),
  OAUTH2_PUBLIC_LOGOUT_URL: url(),
  OAUTH2_TOKEN_URL: url(),
  PORT: port({ default: 4000 }),
  SEGMENT_ANALYTICS_SKIP_MINIMIZE: bool({ default: false }),
  SEGMENT_ANALYTICS_WRITE_KEY: str({ default: "" }),
  SESSION_MAX_AGE_MS: num({ default: 86400000 }), // 24 hours
  SESSION_SECRET: str(),
  STRIPE_PUBLIC_API_KEY: str({ default: "" }),
  SITEMAP_MAX_AGE: num({ default: 43200 }), // 12 hours
  IS_BUILDING_NEXTJS: bool({ default: false })
}, {
  // disable dotenv processing
  dotEnvPath: null,
  // https://www.npmjs.com/package/envalid#strict-mode
  strict: false
});
