import product from "components/ProductDetail/__mocks__/productData.mock";
import priceByCurrencyCode from "./priceByCurrencyCode";

const pricingObject = {
  currency: {
    code: "USD"
  },
  compareAtPrice: null,
  price: 19.99,
  displayPrice: "$12.99 - $19.99"
};

test("should return price", () => {
  const callFunction = priceByCurrencyCode("USD", product.variants[0].pricing);

  expect(typeof priceByCurrencyCode).toBe("function");
  expect(callFunction).toEqual(pricingObject);
});
