import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";

import theme from "lib/theme/reactionTheme";
import option from "./__mocks__/option.mock";
import ProductDetailOption from "./ProductDetailOption";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <ProductDetailOption
        onClick={() => true}
        isSelected={true}
        option={option}
      />
    </MuiThemeProvider>));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
