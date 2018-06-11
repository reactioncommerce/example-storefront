import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import product from "components/ProductDetail/__mocks__/productData.mock";
import ProductItem from "./ProductItem";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: "http://localhost:3000",
      placeholderImageUrls: {
        galleryFeatured: "/resources/placeholder.gif",
        productGrid: "/resources/placeholder.gif"
      }
    }
  }
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <ProductItem currencyCode="USD" product={product} uiStore={uiStore}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
