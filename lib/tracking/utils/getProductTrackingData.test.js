import getProductTrackingData from "./getProductTrackingData";

const product = {
  _id: "1234",
  sku: "a456",
  title: "My Product",
  slug: "my-product",
  vendor: "Reaction",
  tags: {
    nodes: [
      { name: "tag-1" },
      { name: "tag-2" }
    ]
  },
  shop: {
    currency: {
      code: "USD"
    }
  },
  pricing: [
    {
      currency: {
        code: "USD"
      },
      minPrice: 12.99,
      maxPrice: 19.99
    }
  ],
  primaryImage: {
    toGrid: 1,
    priority: 0,
    productId: "1234",
    URLs: {
      original: "/assets/image.jpg"
    }
  }
};

test("getProductTrackingData should return partial data for tracking with segment Product schema", () => {
  const data = getProductTrackingData(product);

  const result = {
    product_id: "1234", // eslint-disable-line camelcase
    sku: "a456",
    category: "tag-1",
    name: "My Product",
    brand: "Reaction",
    currency: "USD",
    price: 12.99,
    quantity: 1,
    value: 12.99,
    image_url: "/assets/image.jpg", // eslint-disable-line camelcase
    url: "/product/my-product"
  };

  expect(data).toEqual(result);
});

test("getProductTrackingData should not fail when tags.nodes is a blank array", () => {
  const productDataWithoutTags = { ...product };

  // When there are no tags, product.tags.nodes may be a blank array
  productDataWithoutTags.tags.nodes = [];

  const data = getProductTrackingData(productDataWithoutTags);

  const result = {
    product_id: "1234", // eslint-disable-line camelcase
    sku: "a456",
    name: "My Product",
    brand: "Reaction",
    currency: "USD",
    price: 12.99,
    quantity: 1,
    value: 12.99,
    image_url: "/assets/image.jpg", // eslint-disable-line camelcase
    url: "/product/my-product"
  };

  expect(data).toEqual(result);
});

