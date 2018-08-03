const routes = require("next-routes")();

routes
  .add("home", "/", "index")
  .add("cart", "/cart", "cart")
  .add("checkout", "/cart/checkout", "checkout")
  .add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
  .add("product", "/product/:slugOrId/:variantId?", "product")
  .add("shop", "/shop/:shopId/:tag", "index")
  .add("tag", "/tag/:slug", "tag");

module.exports = routes;
