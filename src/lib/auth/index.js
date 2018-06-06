import getConfig from "next/config";

// trigger oauth login redirect flow with Keycloak (CLIENT SIDE ONLY)
// https://www.keycloak.org/docs/3.0/securing_apps/topics/oidc/javascript-adapter.html
export const login = () => {
  const Keycloak = require("keycloak-js");
  const { publicRuntimeConfig } = getConfig();
  const { keycloakConfig } = publicRuntimeConfig; // eslint-disable-line no-unused-vars
  const { realm, clientId, url, redirectUri } = keycloakConfig || {};
  const kc = new Keycloak({ realm, clientId, url });
  // eslint-disable-next-line no-console
  kc.init({ flow: "implicit" }).catch((error) => console.error(error));
  // eslint-disable-next-line no-console
  kc.login({ redirectUri }).catch((error) => console.error(error));
};


// log the browser out of Keycloak
export const logout = () => {
  localStorage.removeItem("kc-token");
};
