import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "custom/reactionTheme";
import ordersByAccountId from "containers/order/queries.gql";
import components from "custom/componentsContext";
import ProfileOrders from "./ProfileOrders";


const orders = [
  {
    account: {
      _id: "cmVhY3Rpb24vYWNjb3VudDpQQ1hmYmNuUDlIaFphSjRZRw==",
      fulfillmentGroups: {}
    }
  }
];

const uiStore = {
  orderStatusQuery: [],
  language: "en"
};
const cartStore = {
};
const routingStore = {
};

const authStore = {
  accountId: null,
  isAuthenticated: false
};

const mocks = [
  {
    request: {
      query: ordersByAccountId,
      variables: {
        accountId: "cmVhY3Rpb24vYWNjb3VudDpQQ1hmYmNuUDlIaFphSjRZRw==",
        language: "en",
        orderStatus: "all"
      }
    },
    result: {
      data: {
        orderData: orders
      }
    }
  }
];

test("basic snapshot of profile orders", () => {
  const component = renderer.create((
    <MockedProvider mocks={mocks} addTypename={false}>
      <ComponentsProvider value={components}>
        <Provider
          authStore={authStore}
          cartStore={cartStore}
          primaryShopId={"123"}
          routingStore={routingStore}
          uiStore={uiStore}
        >
          <MuiThemeProvider theme={theme}>
            <ProfileOrders
              orders={orders}
            />
          </MuiThemeProvider>
        </Provider>
      </ComponentsProvider>
    </MockedProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
