import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider as Provider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import Price from "./Price";

test("Renders product price and compare at price", () => {
  const component = renderer.create((
    <Provider theme={theme}>
      <Price displayPrice={"$275.00"} displayCompareAtPrice={"$300.00"}/>
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders product price only", () => {
  const component = renderer.create((
    <Provider theme={theme}>
      <Price displayPrice={"$300.00"} displayCompareAtPrice={"$300.00"}/>
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
