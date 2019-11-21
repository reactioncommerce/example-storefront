import React from "react";
import renderer from "react-test-renderer";
import unboxTheme from "../../custom/unboxTheme";
import { MockedProvider } from "react-apollo/test-utils";
import { Provider } from "mobx-react";
import primaryShopQuery from "containers/common-gql/primaryShop.gql";
import NavigationMobile from "./NavigationMobile";

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

const uiStore = {
  isMenuDrawerOpen: false
};

test("basic snapshot", () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SCThemeProvider theme={unboxTheme}>
        <Provider uiStore={uiStore}>
          <NavigationMobile />
        </Provider>
      </SCThemeProvider>
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
