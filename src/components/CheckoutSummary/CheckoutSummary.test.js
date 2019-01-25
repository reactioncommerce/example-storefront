import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import CheckoutSummary from "./CheckoutSummary";

const testCart = {
  checkout: {
    summary: {
      itemTotal: {
        displayAmount: "$118"
      },
      total: {
        displayAmount: "$118"
      }
    }
  },
  totalItemQuantity: 3,
  items: [
    {
      _id: "123",
      attributes: [
        { label: "Color", value: "Red" },
        { label: "Size", value: "Medium" }
      ],
      compareAtPrice: {
        displayAmount: "$45.00"
      },
      currentQuantity: 3,
      imageURLs: {
        small: "//placehold.it/150",
        thumbnail: "//placehold.it/100"
      },
      isLowQuantity: true,
      price: {
        displayAmount: "$20.00"
      },
      productSlug: "product-slug",
      productVendor: "Patagonia",
      title: "A Great Product",
      quantity: 2
    },
    {
      _id: "456",
      attributes: [
        { label: "Color", value: "Black" },
        { label: "Size", value: "10" }
      ],
      currentQuantity: 500,
      imageURLs: {
        small: "//placehold.it/150",
        thumbnail: "//placehold.it/100"
      },
      isLowQuantity: false,
      price: {
        displayAmount: "$78.00"
      },
      productVendor: "Nike",
      productSlug: "product-slug",
      title: "Another Great Product",
      quantity: 1
    }
  ]
};

test("basic snapshot", () => {
  const component = renderer.create((
    <ComponentsProvider value={components}>
      <MuiThemeProvider theme={theme}>
        <CheckoutSummary
          cart={testCart}
        />
      </MuiThemeProvider>
    </ComponentsProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
