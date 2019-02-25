import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import OrderCard from "./OrderCard";

const order = {
  createdAt: "2018-03-21T21:36:36.307Z",
  fulfillmentGroups: [
    {
      data: {
        shippingAddress: {
          address1: "2110 Main Street",
          address2: null,
          city: "Santa Monica",
          company: null,
          country: "US",
          fullName: "Reaction Commerce",
          isCommercial: false,
          isShippingDefault: false,
          phone: "3105556789",
          postal: "90405",
          region: "CA"
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
            attributes: [{ label: "Color", value: "Black" }, { label: "Size", value: "10" }],
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
      },
      selectedFulfillmentOption: {
        fulfillmentMethod: {
          carrier: "Carier Name",
          displayname: "Display Name"
        }
      }
    }
  ],
  payments: [
    {
      amount: { displayAmount: "$6,002.99" },
      billingAddress: null,
      displayName: "Visa 1111",
      method: { name: "stripe_card" }
    }
  ],
  referenceId: "abcdef",
  status: "new",
  summary: {
    fulfillmentTotal: { amount: 2.99, displayAmount: "$2.99" },
    itemTotal: { amount: 138, displayAmount: "$138.00" },
    surchargeTotal: { amount: 0, displayAmount: "$0.00" },
    taxTotal: { amount: 0, displayAmount: "$0.00" },
    total: { amount: 140.99, displayAmount: "$140.99" }
  }
};

test("basic snapshot of full order card", () => {
  const component = renderer.create((
    <ComponentsProvider value={components}>
      <MuiThemeProvider theme={theme}>
        <OrderCard
          order={order}
        />
      </MuiThemeProvider>
    </ComponentsProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
