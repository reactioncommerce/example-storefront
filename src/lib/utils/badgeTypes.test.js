import { BADGE_TYPES } from "./badgeTypes";

const BADGE_TYPES_VALUES = {
  BACKORDER: "BACKORDER",
  BESTSELLER: "BESTSELLER",
  LOW_QUANTITY: "LOW_QUANTITY",
  SOLD_OUT: "SOLD_OUT",
  SALE: "SALE"
};

test("badge types values", () => {
  expect(typeof BADGE_TYPES).toBe("object");
  expect(BADGE_TYPES).toEqual(BADGE_TYPES_VALUES);
});
