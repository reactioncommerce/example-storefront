import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { MockedProvider } from "react-apollo/test-utils";
import { Provider } from "mobx-react";
import shopQuery from "containers/shop/shop.gql";
import anonymousCartByCartIdQuery from "containers/cart/queries.gql";
import primaryShopIdQuery from "containers/common-gql/primaryShopId.gql";
import MiniCart from "./MiniCart";

const shop = {
  _id: "reaction/shop:1234",
  description: null,
  name: "Reaction",
  currency: {
    code: "USD"
  }
};

const mocks = [
  {
    request: {
      query: primaryShopIdQuery
    },
    result: {
      data: {
        primaryShopId: shop._id
      }
    }
  },
  {
    request: {
      query: shopQuery,
      variables: {
        shopId: shop._id
      }
    },
    result: {
      data: {
        shop
      }
    }
  },
  {
    request: {
      query: anonymousCartByCartIdQuery,
      variables: {
        cartId: "1234",
        token: "1234"
      }
    },
    result: {
      data: {
        cart: {
          _id: "reaction/cart:1234",
          items: {
            pageInfo: {
              hasNextPage: false
            },
            edges: []
          }
        }
      }
    }
  }
];

const cartStore = {
  anonymousCartToken: "1213123",
  anonymousCartId: "12w123132",
  hasAnonymousCartCredentials: true,
  setAnonymousCartCredentialsFromLocalStorage: () => {},
  setAccountCartId: () => {}
};

const authStore = {
  accountId: null,
  isAuthenticated: false
};

const uiStore = {
  openCart() {},
  closeCart() {},
  isCartOpen: false
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MockedProvider mocks={mocks} addTypename={false}>
      <MuiThemeProvider theme={theme}>
        <Provider primaryShopId={shop._id} cartStore={cartStore} authStore={authStore} shop={shop}
          uiStore={uiStore}
        >
          <MiniCart />
        </Provider>
      </MuiThemeProvider>
    </MockedProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
