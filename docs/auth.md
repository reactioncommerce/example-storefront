# Auth & Cookies

User Authentication in the Starterkit is done via OAuth 2 and Open ID Connect.
After authentication is completed with Hydra (the OAuth 2 and OIDC server), two tokens are issued for use in the Starterkit - an access token and a refresh token.
These two tokens are first available in the Express server from Passport (the OAuth 2 implementation lib).
They are then written to the browser cookie when the page is rendered.

## How cookies are used
The Apollo Client sends the access token in an Authorization header in requests to the GraphQL server.

## What happens when token is expired while querying from client code
When the Apollo client makes a request to the GraphQL API with an expired access token, it receives a network error with error code 401.
The Apollo client is configured to catch such an error and then make a refresh token request to the OAuth Identity Provider (IDP).
If the token refresh is successful, new access tokens and refresh tokens are returned. The new tokens are then to be written to the browser cookie with the same name as before.

## Type of cookie used
- Because the content of the cookie can change on both the server and in the browser:
  - The cookie is not set as HTTP-only. This makes the cookie available to JavaScript code.
  - The cookie is not "signed" - The cookie content can be encoded as base 64, but it is not signed to detect tampering (see https://github.com/expressjs/cookie-session#cookie-options)

## Security
- Making the cookie available to JavaScript code raises security concerns. How can we address this?
- Or perhaps we should not be using cookies for this in the first place? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Security


## How do we clear the cookie/state at logout
- We can update the logout process to issue a delete cookie call via ExpressJS' `res.clearCookie` method.

