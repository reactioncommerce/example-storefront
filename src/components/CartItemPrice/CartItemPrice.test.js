import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider as Provider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import CartItemPrice from "./CartItemPrice";

test("Renders product price and compare at price", () => {
  const component = renderer.create((
    <Provider theme={theme}>
      <CartItemPrice displayPrice={"$275.00"} displayCompareAtPrice={"$300.00"}/>
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders product price only", () => {
  const component = renderer.create((
    <Provider theme={theme}>
      <CartItemPrice displayPrice={"$300.00"} displayCompareAtPrice={"$300.00"}/>
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
