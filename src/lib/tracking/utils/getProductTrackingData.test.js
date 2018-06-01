import getProductTrackingData from "./getProductTrackingData";

const product = {
  _id: "1234",
  sku: "a456",
  title: "My Product",
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
    image_url: "/assets/image.jpg" // eslint-disable-line camelcase
  };

  expect(data).toEqual(result);
});
