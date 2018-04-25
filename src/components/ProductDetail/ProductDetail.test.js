import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";

import theme from "lib/theme/reactionTheme";
import ProductDetail from "./ProductDetail";
import sampleData from "./__mocks__/productData.mock";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <ProductDetail catalogProduct={sampleData} />
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
