import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import OrderCard from "./OrderCard";

const order = {
  account: {
    _id: "cmVhY3Rpb24vYWNjb3VudDpQQ1hmYmNuUDlIaFphSjRZRw==",
    fulfillmentGroups: {}
  }
};

test("basic snapshot", () => {
  const component = renderer.create((
    <ComponentsProvider value={components}>
      <MuiThemeProvider theme={theme}>
        <OrderCard
          order={order}
        />
      </MuiThemeProvider>
    </ComponentsProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
