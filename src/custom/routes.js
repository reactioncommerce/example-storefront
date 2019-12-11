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
    .add("login", "/login", "login")
    .add("terms", "/terms", "terms")
    .add("cart", "/cart", "cart")
    .add("category", "/category/:slugOrId/:variantId?", "category")
    .add("teste", "/forgotPassword", "forgotPassword")
    .add("register", "/register", "register")
    .add("checkout", "/cart/checkout", "checkout")
    .add("orders", "/orders", "orders")
    .add("orderDetail", "/orders/orderId/detail", "orderDetail")
    .add("search", "/search/:slugOrId", "search")
    .add("myAccount", "/my-account", "myAccount")
    .add("checkoutLogin", "/cart/login", "checkout")
    .add("checkoutComplete", "/checkout/order/:orderId", "checkoutComplete")
    .add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
    .add("product", "/product/:slugOrId/:variantId?", "product")
    .add("shop", "/shop/:shopId/:tag", "productGrid")
    .add("tag", "/tag/:slug", "tag")
    .add("profileAddressBook", "/profile/address", "profileAddressBook")
    .add("profileOrders", "/profile/orders", "profileOrders");
}

module.exports = defineRoutes;
