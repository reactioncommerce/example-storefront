import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";

import theme from "lib/theme/reactionTheme";
import options from "./__mocks__/options.mock";
import ProductDetailOptionsList from "./ProductDetailOptionsList";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <ProductDetailOptionsList
        options={options}
      />
    </MuiThemeProvider>));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
