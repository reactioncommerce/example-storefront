#!/usr/bin/env node

/* eslint-disable no-console */
const http = require("http");

const missing = [
  "OAUTH2_ADMIN_PORT",
  "OAUTH2_CLIENT_ID",
  "OAUTH2_CLIENT_SECRET",
  "OAUTH2_HOST",
  "OAUTH2_REDIRECT_URL"
].filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`ERROR: Missing required environment variables ${missing.join(" ")}`);
  process.exit(12);
}

/* eslint-disable camelcase */
const bodyEncoded = JSON.stringify({
  client_id: process.env.OAUTH2_CLIENT_ID,
  client_secret: process.env.OAUTH2_CLIENT_SECRET,
  grant_types: [
    "authorization_code",
    "refresh_token"
  ],
  jwks: {},
  redirect_uris: [process.env.OAUTH2_REDIRECT_URL],
  response_types: ["token", "code"],
  scope: "offline",
  subject_type: "public",
  token_endpoint_auth_method: "client_secret_post"
});
/* eslint-enable camelcase */

const options = {
  hostname: process.env.OAUTH2_HOST,
  port: process.env.OAUTH2_ADMIN_PORT,
  path: "/clients",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(bodyEncoded)
  }
};

const req = http.request(options, (res) => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", (chunk) => {
    body += chunk.toString();
  });
  res.on("end", () => {
    switch (res.statusCode) {
      case 200:
      // intentional fallthrough!
      // eslint-disable-line no-fallthrough
      case 201:
        console.log("OK: hydra client created");
        break;
      case 409:
        console.log("OK: hydra client already exists");
        break;
      default:
        console.error("ERROR: Could not create hydra client");
        console.error(body);
        process.exit(10);
    }
  });
});

req.on("error", (error) => {
  console.error("ERROR: Could not create hydra client");
  console.error(error.message);
  process.exit(11);
});

req.end(bodyEncoded);
