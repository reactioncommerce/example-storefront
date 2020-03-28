import getCartItemTrackingData from "./getCartItemTrackingData";

const cartItem = {
  cart_id: "cmVhY3Rpb24vY2FydDoyRURYakpCRlhtNUJqd3ZrQQ==", // eslint-disable-line camelcase
  _id: "cmVhY3Rpb24vY2FydEl0ZW06ekRSNXR1dTVOR0hOYUpiUkM=",
  productConfiguration: {
    productId: "cmVhY3Rpb24vcHJvZHVjdDpjUjZMS041eUdTaWVpN2NpYQ==",
    productVariantId: "cmVhY3Rpb24vcHJvZHVjdDp0TWtwNVF3Wm9nNWloWVRmRw=="
  },
  imageURLs: {
    original: "/jamakassi-569805-unsplash.jpg"
  },
  price: {
    amount: 12.99
  },
  productSlug: "new-york-city-1998-t-shirt",
  quantity: 3,
  title: "New York City 1998 T-Shirt",
  productTags: {
    nodes: [
      { name: "Shirts" },
      { name: "Women's" },
      { name: "T-Shirts" }
    ]
  },
  productVendor: "City Shirts",
  variantTitle: "Small"
};

test("getCartItemTrackingData should return tracking data for a cart item", () => {
  const data = getCartItemTrackingData(cartItem);

  const trackingData = {
    cart_id: "cmVhY3Rpb24vY2FydDoyRURYakpCRlhtNUJqd3ZrQQ==", // eslint-disable-line camelcase
    product_id: "cmVhY3Rpb24vcHJvZHVjdDp0TWtwNVF3Wm9nNWloWVRmRw==", // eslint-disable-line camelcase
    category: "Shirts",
    name: "New York City 1998 T-Shirt",
    brand: "City Shirts",
    variant: "Small",
    price: 12.99,
    quantity: 3,
    image_url: "/jamakassi-569805-unsplash.jpg", // eslint-disable-line camelcase
    url: "/product/new-york-city-1998-t-shirt"
  };

  expect(data).toEqual(trackingData);
});
