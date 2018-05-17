import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";

import catalogProduct from "components/ProductDetail/__mocks__/productData.mock";
import theme from "lib/theme/reactionTheme";
import VariantList from "./VariantList";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <VariantList
        product={catalogProduct}
        variants={catalogProduct.variants}
      />
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
