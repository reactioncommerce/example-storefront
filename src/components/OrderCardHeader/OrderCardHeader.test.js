import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import OrderCardHeader from "./OrderCardHeader";

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
  status: "new"
};

test("basic snapshot of order card header", () => {
  const component = renderer.create((
    <ComponentsProvider value={components}>
      <MuiThemeProvider theme={theme}>
        <OrderCardHeader
          order={order}
        />
      </MuiThemeProvider>
    </ComponentsProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
