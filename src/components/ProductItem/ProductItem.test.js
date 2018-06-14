import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "lib/theme/reactionTheme";
import product from "components/ProductDetail/__mocks__/productData.mock";
import ProductItem from "./ProductItem";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: "",
      placeholderImageUrls: {
        productGrid: ""
      }
    }
  }
};

test("basic snapshot", () => {
  const component = renderer.create(<MuiThemeProvider theme={theme}>
    <Provider uiStore={uiStore}>
      <ProductItem currencyCode="USD" product={product} />
    </Provider>
  </MuiThemeProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
