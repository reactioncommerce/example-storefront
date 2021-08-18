const fetch = require("isomorphic-unfetch");
const config = require("./config");

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

/**
 * Creates a new Hydra client when on does not exist
 *
 * @returns {undefined}
 */
async function createHydraClientIfNecessary() {
  let adminUrl = config.OAUTH2_ADMIN_URL;
  if (!adminUrl.endsWith("/")) adminUrl = `${adminUrl}/`;

  const getClientResponse = await fetch(`${adminUrl}clients/${config.OAUTH2_CLIENT_ID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (![200, 404].includes(getClientResponse.status)) {
    // eslint-disable-next-line no-console
    console.error(await getClientResponse.text());
    throw new Error(`Could not get Hydra client [${getClientResponse.status}]`);
  }

  if (getClientResponse.status === 200) {
    // Update the client to be sure it has the latest config
    // eslint-disable-next-line no-console
    console.info("Updating Hydra client...");

    const updateClientResponse = await fetch(`${adminUrl}clients/${config.OAUTH2_CLIENT_ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storefrontHydraClient)
    });

    if (updateClientResponse.status === 200) {
      // eslint-disable-next-line no-console
      console.info("OK: Hydra client updated");
    } else {
      // eslint-disable-next-line no-console
      console.error(await updateClientResponse.text());
      throw new Error(`Could not update Hydra client [${updateClientResponse.status}]`);
    }
  } else {
    // eslint-disable-next-line no-console
    console.info("Creating Hydra client...");

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
        // eslint-disable-next-line no-console
        console.info("OK: Hydra client created");
        break;
      case 409:
        // eslint-disable-next-line no-console
        console.info("OK: Hydra client already exists");
        break;
      default:
        // eslint-disable-next-line no-console
        console.error(await response.text());
        throw new Error(`Could not create Hydra client [${response.status}]`);
    }
  }
}

createHydraClientIfNecessary();
