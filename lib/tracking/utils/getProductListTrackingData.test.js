import getProductListTrackingData from "./getProductListTrackingData";

const tag = {
  _id: "tag123",
  name: "My Tag"
};

const products = [{
  _id: "1234",
  sku: "a456",
  title: "My Product",
  vendor: "Reaction",
  slug: "my-product",
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
}];

test("getProductListTrackingData should return data for tracking with segment Product List schema", () => {
  const data = getProductListTrackingData({ tag, products });

  const result = {
    list_id: "tag123", // eslint-disable-line camelcase
    category: "My Tag",
    products: [
      {
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
      }
    ]
  };

  expect(data).toEqual(result);
});
