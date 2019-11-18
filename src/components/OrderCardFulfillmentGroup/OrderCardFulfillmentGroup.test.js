import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import OrderCardFulfillmentGroup from "./OrderCardFulfillmentGroup";

const testFulfillmentGroup = {
  summary: {
    itemTotal: {
      displayAmount: "$118"
    },
    total: {
      displayAmount: "$118"
    }
  },
  items: {
    nodes: [
      {
        _id: "123",
        attributes: [{ label: "Color", value: "Red" }, { label: "Size", value: "Medium" }],
        compareAtPrice: {
          displayAmount: "$45.00"
        },
        imageURLs: {
          small: "//placehold.it/150",
          thumbnail: "//placehold.it/100"
        },
        inventoryAvailableToSell: 3,
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
        attributes: [{ label: "Color", value: "Black" }, { label: "Size", value: "10" }],
        imageURLs: {
          small: "//placehold.it/150",
          thumbnail: "//placehold.it/100"
        },
        inventoryAvailableToSell: 30,
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
  },
  selectedFulfillmentOption: {
    fulfillmentMethod: {
      displayName: "Free Shipping",
      group: "Ground"
    }
  }
};

const testPayments = [{
  _id: "TEST",
  amount: {
    displayAmount: "$10.00"
  },
  displayName: "Example Payment"
}];

test("basic snapshot", () => {
  const component = renderer.create((
    <ComponentsProvider value={components}>
      <MuiThemeProvider theme={theme}>
        <OrderCardFulfillmentGroup
          fulfillmentGroup={testFulfillmentGroup}
          payments={testPayments}
        />
      </MuiThemeProvider>
    </ComponentsProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
