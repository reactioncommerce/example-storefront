import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { MockedProvider } from "react-apollo/test-utils";
import { Provider } from "mobx-react";
import primaryShopQuery from "containers/common-gql/primaryShop.gql";
import NavigationMobile from "./NavigationMobile";

const shop = {
  _id: "reaction/shop:1234",
  description: null,
  name: "Reaction",
  currency: {
    code: "USD"
  },
  defaultNavigationTree: {
    items: [{
      items: [],
      navigationItem: {
        data: {
          classNames: null,
          content: [{
            language: "en",
            value: "NavItem"
          }],
          isUrlRelative: true,
          shouldOpenInNewWindow: false,
          url: "/nav-item"
        }
      }
    }]
  }
};

const mocks = [
  {
    request: {
      query: primaryShopQuery,
      variables: {
        language: "en"
      }
    },
    result: {
      data: {
        primaryShop: shop
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
          navItems={shop.defaultNavigationTree.items[0]}
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
