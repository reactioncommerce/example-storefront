import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { MockedProvider } from "react-apollo/test-utils";
import { Provider } from "mobx-react";
import primaryShopIdQuery from "containers/common-gql/primaryShopId.gql";
import shopQuery from "containers/shop/shop.gql";
import NavigationMobile from "./NavigationMobile";

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
  }
];

const authStore = {
  accountId: null,
  isAuthenticated: false
};

const uiStore = {
  isMenuDrawerOpen: false
};

const tags = [{
  _id: "cmVhY3Rpb24vdGFnOjVXZE5LYXprejZ5TWdrcGY5",
  position: null,
  slug: "tag-slug",
  name: "Tag Name",
  subTags: [
    {
      node: {
        _id: "cmVhY3Rpb24vdGFnOlRFdjdSV1pDTHl1d1dmOWs2",
        position: null,
        slug: "sub-tag-slug",
        name: "Sub Tag Name",
        subTags: []
      }
    },
    {
      node: {
        _id: "cmVhY3Rpb24vdGFnOmJ2MmVEbzV3V3lvNUdNMlN3",
        position: null,
        slug: "sub-tag-slug",
        name: "Sub Tag name",
        subTags: []
      }
    }
  ]
}];

test("basic snapshot", () => {
  const component = renderer.create((
    <MockedProvider mocks={mocks} addTypename={false}>
      <MuiThemeProvider theme={theme}>
        <Provider
          primaryShopId={shop._id}
          authStore={authStore}
          navItems={[]}
          tags={tags}
          uiStore={uiStore}
        >
          <NavigationMobile shop={shop} />
        </Provider>
      </MuiThemeProvider>
    </MockedProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
