import relayConnectionToArray from "./relayConnectionToArray";

const items = {
  edges: [
    {
      node: {
        currentQuantity: null,
        optionTitle: "Red",
        productSlug: "basic-reaction-product",
        productType: "product-simple",
        productVendor: "Example Manufacturer",
        variantTitle: "Option 1 - Red Dwarf"
      }
    },
    {
      node: {
        currentQuantity: null,
        optionTitle: "Green",
        productSlug: "basic-reaction-product",
        productType: "product-simple",
        productVendor: "Example Manufacturer",
        variantTitle: "Option 2 - Green Tomato"
      }
    }
  ]
};

test("relayConnectionToArray should convert a relay cursor connection to an array of objects", () => {
  const result = relayConnectionToArray(items);

  const expected = [
    {
      currentQuantity: null,
      optionTitle: "Red",
      productSlug: "basic-reaction-product",
      productType: "product-simple",
      productVendor: "Example Manufacturer",
      variantTitle: "Option 1 - Red Dwarf"
    },
    {
      currentQuantity: null,
      optionTitle: "Green",
      productSlug: "basic-reaction-product",
      productType: "product-simple",
      productVendor: "Example Manufacturer",
      variantTitle: "Option 2 - Green Tomato"
    }
  ];

  expect(result).toEqual(expected);
});
