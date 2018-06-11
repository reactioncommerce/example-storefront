import product from "components/ProductDetail/__mocks__/productData.mock";
import badgeStatus from "./badgeStatus";
import { BADGE_TYPES } from "./badgeTypes";

const backorderProduct = Object.assign({}, product, { isSoldOut: true, isBackorder: true });
const soldOutProduct = Object.assign({}, product, { isSoldOut: true, isBackorder: false });
const isLowQuantity = Object.assign({}, product, { isLowQuantity: true });
const isOnSale = Object.assign({}, product, { isOnSale: true });
const isBestseller = Object.assign({}, product, { isBestseller: true });


test("badgeStatus util should return `backorder` status", () => {
  const callFunction = badgeStatus(backorderProduct);

  expect(typeof badgeStatus).toBe("function");
  expect(callFunction).toEqual({ type: BADGE_TYPES.BACKORDER, label: "Backorder" });
});

test("badgeStatus util should return `sold out` status", () => {
  const callFunction = badgeStatus(soldOutProduct);

  expect(typeof badgeStatus).toBe("function");
  expect(callFunction).toEqual({ type: BADGE_TYPES.SOLD_OUT, label: "Sold Out" });
});

test("badgeStatus util should return `low inventory` status", () => {
  const callFunction = badgeStatus(isLowQuantity);

  expect(typeof badgeStatus).toBe("function");
  expect(callFunction).toEqual({ type: BADGE_TYPES.LOW_QUANTITY, label: "Low Inventory" });
});

test("badgeStatus util should return `on sale` status", () => {
  const callFunction = badgeStatus(isOnSale);

  expect(typeof badgeStatus).toBe("function");
  expect(callFunction).toEqual({ type: BADGE_TYPES.SALE, label: "Sale" });
});

test("badgeStatus util should return `bestseller` status", () => {
  const callFunction = badgeStatus(isBestseller);

  expect(typeof badgeStatus).toBe("function");
  expect(callFunction).toEqual({ type: BADGE_TYPES.BESTSELLER, label: "Best Seller" });
});
