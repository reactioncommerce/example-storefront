import product from "components/ProductDetail/__mocks__/productData.mock";
import isProductOnSale from "./isProductOnSale";

const isOnSale = Object.assign({}, product, { isOnSale: true });
const isNotOnSale = Object.assign({}, product, { isOnSale: false });

test("isProductOnSale should return false", () => {
  const callFunction = isProductOnSale(isNotOnSale);

  expect(typeof isProductOnSale).toBe("function");
  expect(callFunction).toEqual(false);
});

test("isProductOnSale should return true", () => {
  const callFunction = isProductOnSale(isOnSale);

  expect(typeof isProductOnSale).toBe("function");
  expect(callFunction).toEqual(true);
});
