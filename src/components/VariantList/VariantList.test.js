import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";

import catalogProduct from "components/ProductDetail/__mocks__/productData.mock";
import theme from "lib/theme/reactionTheme";
import VariantList from "./VariantList";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <VariantList
        product={catalogProduct}
        selectedOptionId="cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OlNNcjRyaERGbll2Rk10RFRY"
        selectedVariantId="cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OjZxaXFQd0JrZUpkdGRRYzRH"
        variants={catalogProduct.variants}
      />
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
