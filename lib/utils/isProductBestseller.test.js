import product from "./__mocks__/productData.mock";
import isProductBestseller from "./isProductBestseller";

const isBestseller = Object.assign({}, product, { isBestseller: true });
const isNotBestseller = Object.assign({}, product, { isBestseller: false });

test("isProductBestseller should return false", () => {
  const callFunction = isProductBestseller(isNotBestseller);

  expect(typeof isProductBestseller).toBe("function");
  expect(callFunction).toEqual(false);
});

test("isProductBestseller should return true", () => {
  const callFunction = isProductBestseller(isBestseller);

  expect(typeof isProductBestseller).toBe("function");
  expect(callFunction).toEqual(true);
});
