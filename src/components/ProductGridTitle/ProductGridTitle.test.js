import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import ProductGridTitle from "./ProductGridTitle";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      placeholderImageUrls: {
        productGrid: ""
      }
    }
  }
};

const tagWithTitle = {
  name: "TagWithTitle",
  _id: "rubhpcpSzrgZuBCEM",
  slug: "tag-with-Title",
  isTopLevel: true,
  updatedAt: "2018-05-25 17:48:29.745Z",
  createdAt: "2018-05-25 17:48:29.745Z",
  isDeleted: false,
  isVisible: true,
  groups: [],
  shopId: "J8Bhq3uTtdgwZx3rz",
  displayTitle: "Test Title"
};

const tagWithoutTitle = {
  name: "TagWithoutTitle",
  _id: "rubhpcpSzrgZuBCEM",
  slug: "tag-withpoiut-Title",
  isTopLevel: true,
  updatedAt: "2018-05-25 17:48:29.745Z",
  createdAt: "2018-05-25 17:48:29.745Z",
  isDeleted: false,
  isVisible: true,
  groups: [],
  shopId: "J8Bhq3uTtdgwZx3rz"
};

test("snapshot of tagWithTitle", () => {
  const component = renderer.create(<MuiThemeProvider theme={theme}>
    <Provider uiStore={uiStore}>
      <ProductGridTitle tag={tagWithTitle} />
    </Provider>
  </MuiThemeProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshop of tagWithoutTitle", () => {
  const component = renderer.create(<MuiThemeProvider theme={theme}>
    <Provider uiStore={uiStore}>
      <ProductGridTitle tag={tagWithoutTitle} />
    </Provider>
  </MuiThemeProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
