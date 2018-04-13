const routes = require("next-routes")();

routes
  .add("shop", "/shop/:shopId/:tag", "index")
  .add("tag", "/tag/:slug", "index");

module.exports = routes;
