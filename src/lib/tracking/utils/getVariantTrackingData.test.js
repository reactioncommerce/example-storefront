import getVariantTrackingData from "./getVariantTrackingData";

const variant = {
  _id: "reaction/catalogProductItem:1002",
  variantId: "1002",
  title: "Men's Lightweight Synchilla",
  index: 0,
  pricing: [
    {
      currency: { code: "USD" },
      price: 19.99
    }
  ],
  options: [
    {
      _id: "reaction/catalogProductItem:1003",
      variantId: "1003",
      title: "Men's Lightweigth Synchilla",
      index: 0,
      pricing: [
        {
          currency: { code: "USD" },
          price: 29.99
        }
      ]
    }
  ]
};

const product = {
  _id: "1234",
  slug: "my-product",
  shop: {
    currency: {
      code: "USD"
    }
  },
  media: [
    {
      priority: 0,
      productId: "1001",
      variantId: "1002",
      URLs: {
        original: "/assets/image-1002.jpg"
      }
    },
    {
      priority: 0,
      productId: "1001",
      variantId: "1003",
      URLs: {
        original: "/assets/image-1003.jpg"
      }
    }
  ]
};

test("getVariantTrackingData should return variant tracking data with supplied variant", () => {
  const data = getVariantTrackingData({ variant });

  const result = {
    variant: "reaction/catalogProductItem:1002",
    price: undefined,
    quantity: 1,
    position: 0,
    value: undefined,
    image_url: undefined, // eslint-disable-line camelcase
    url: undefined
  };

  expect(data).toEqual(result);
});

test("getVariantTrackingData should return variant tracking data with supplied variant and product", () => {
  const data = getVariantTrackingData({ variant, product });

  const result = {
    variant: "reaction/catalogProductItem:1002",
    price: 19.99,
    quantity: 1,
    position: 0,
    value: 19.99,
    image_url: "/assets/image-1002.jpg", // eslint-disable-line camelcase
    url: "/product/my-product/reaction%2FcatalogProductItem%3A1002"
  };

  expect(data).toEqual(result);
});

test("getVariantTrackingData should return variant tracking data with supplied variant, optionId and product", () => {
  const data = getVariantTrackingData({ variant, optionId: "reaction/catalogProductItem:1003", product });

  const result = {
    variant: "reaction/catalogProductItem:1003",
    price: 29.99,
    quantity: 1,
    position: 0,
    value: 29.99,
    image_url: "/assets/image-1003.jpg", // eslint-disable-line camelcase
    url: "/product/my-product/reaction%2FcatalogProductItem%3A1003"
  };

  expect(data).toEqual(result);
});

test("getVariantTrackingData should not have media", () => {
  const { media, ...productWithNoMedia } = product;
  const data = getVariantTrackingData({
    variant,
    optionId: "reaction/catalogProductItem:1003",
    product: productWithNoMedia
  });

  const result = {
    variant: "reaction/catalogProductItem:1003",
    price: 29.99,
    quantity: 1,
    position: 0,
    value: 29.99,
    image_url: undefined, // eslint-disable-line camelcase
    url: "/product/my-product/reaction%2FcatalogProductItem%3A1003"
  };

  expect(data).toEqual(result);
});
