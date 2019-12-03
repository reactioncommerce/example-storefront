/**
 * @see https://www.npmjs.com/package/next-routes
 * @param {Object} routes The next-routes `routes` object.
 * @returns {undefined}
 */
function defineRoutes(routes) {
  routes
    .add("home", "/", "home")
    .add("brand", "/brand", "brand")
    .add("faq", "/faq", "faq")
    .add("loginTest", "/loginTest", "loginTest")
    .add("terms", "/terms", "terms")
    .add("cart", "/cart", "cart")
    .add("teste", "/forgotPassword", "forgotPassword")
    .add("register", "/register", "register")
    .add("checkout", "/cart/checkout", "checkout")
    .add("checkoutLogin", "/cart/login", "checkout")
    .add("checkoutComplete", "/checkout/order/:orderId", "checkoutComplete")
    .add("login", "/login", "login")
    .add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
    .add("product", "/product/:slugOrId/:variantId?", "product")
    .add("shop", "/shop/:shopId/:tag", "productGrid")
    .add("tag", "/tag/:slug", "tag")
    .add("profileAddressBook", "/profile/address", "profileAddressBook")
    .add("profileOrders", "/profile/orders", "profileOrders");
}

module.exports = defineRoutes;
