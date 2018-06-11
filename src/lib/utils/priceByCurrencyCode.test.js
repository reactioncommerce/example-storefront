import product from "components/ProductDetail/__mocks__/productData.mock";
import priceByCurrencyCode from "./priceByCurrencyCode";

const variant = {
  _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OjZxaXFQd0JrZUpkdGRRYzRH",
  ancestorIds: [
    "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s="
  ],
  title: "Sample Variant",
  pricing: [
    {
      currency: {
        code: "USD"
      },
      compareAtPrice: null,
      price: 19.99,
      displayPrice: "$12.99 - $19.99"
    }
  ],
  optionTitle: "Untitled Option",
  isLowQuantity: false,
  isSoldOut: true,
  isBackorder: false,
  options: [
    {
      _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OlNNcjRyaERGbll2Rk10RFRY",
      title: "Option 1 - Red Dwarf",
      pricing: [
        {
          currency: {
            code: "USD"
          },
          compareAtPrice: null,
          price: 19.99,
          displayPrice: "$12.99 - $19.99"
        }
      ],
      optionTitle: "Red",
      isLowQuantity: false,
      isSoldOut: true,
      isBackorder: true
    },
    {
      _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OkNKb1JCbTl2UnJvcmM5bXha",
      title: "Option 2 - Green Tomato",
      pricing: [
        {
          currency: {
            code: "USD"
          },
          compareAtPrice: null,
          price: 19.99,
          displayPrice: "$12.99 - $19.99"
        }
      ],
      optionTitle: "Green",
      isLowQuantity: false,
      isSoldOut: false,
      isBackorder: false
    }
  ]
};

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
