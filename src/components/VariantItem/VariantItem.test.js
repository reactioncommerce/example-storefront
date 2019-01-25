import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "custom/reactionTheme";
import variant from "./__mocks__/variant.mock";
import VariantItem from "./VariantItem";

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <VariantItem
        currencyCode="USD"
        isActive={true}
        handleClick={() => true}
        variant={variant}
      />
    </MuiThemeProvider>));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
