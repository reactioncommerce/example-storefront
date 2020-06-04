import relayConnectionToArray from "./relayConnectionToArray";

const items = {
  edges: [
    {
      node: {
        optionTitle: "Red",
        productSlug: "basic-reaction-product",
        productType: "product-simple",
        productVendor: "Example Manufacturer",
        variantTitle: "Option 1 - Red Dwarf"
      }
    },
    {
      node: {
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
      optionTitle: "Red",
      productSlug: "basic-reaction-product",
      productType: "product-simple",
      productVendor: "Example Manufacturer",
      variantTitle: "Option 1 - Red Dwarf"
    },
    {
      optionTitle: "Green",
      productSlug: "basic-reaction-product",
      productType: "product-simple",
      productVendor: "Example Manufacturer",
      variantTitle: "Option 2 - Green Tomato"
    }
  ];

  expect(result).toEqual(expected);
});
