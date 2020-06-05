import product from "./__mocks__/productData.mock";
import isProductLowQuantity from "./isProductLowQuantity";

const isLowQuantity = Object.assign({}, product, { isLowQuantity: true, isSoldOut: false });
const isNotLowQuantity = Object.assign({}, product, { isLowQuantity: false, isSoldOut: false });

test("isProductLowQuantity should return false", () => {
  const callFunction = isProductLowQuantity(isNotLowQuantity);

  expect(typeof isProductLowQuantity).toBe("function");
  expect(callFunction).toEqual(false);
});

test("isProductLowQuantity should return true", () => {
  const callFunction = isProductLowQuantity(isLowQuantity);

  expect(typeof isProductLowQuantity).toBe("function");
  expect(callFunction).toEqual(true);
});
