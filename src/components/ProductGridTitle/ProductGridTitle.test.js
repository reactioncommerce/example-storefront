import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
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

test("snapshot of a tag with a displayTitle", () => {
  const component = renderer.create(<MuiThemeProvider theme={theme}>
    <Provider uiStore={uiStore}>
      <ProductGridTitle displayTitle={"Test Title"} />
    </Provider>
  </MuiThemeProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshop of tag without a displayTitle", () => {
  const component = renderer.create(<MuiThemeProvider theme={theme}>
    <Provider uiStore={uiStore}>
      <ProductGridTitle displayTitle={""} />
    </Provider>
  </MuiThemeProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
