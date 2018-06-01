import getVariantTrackingData from "./getVariantTrackingData";

const variant = {
  variantId: "1234",
  title: "Men's Lightweigth Synchilla",
  index: 0,
  price: 19.99
};

test("getVariantTrackingData should return partial data for tracking with segment Product schema", () => {
  const data = getVariantTrackingData(variant);

  const result = {
    variant: "1234",
    price: 19.99,
    quantity: 1,
    position: 0,
    value: 19.99
  };

  expect(data).toEqual(result);
});
