import React from "react";
import renderer from "react-test-renderer";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import mockComponents from "../../../tests/mockComponents";
import ProfileOrders from "./ProfileOrders";

const orders = [];

test("basic snapshot", () => {
  const component = renderer.create((
    <ComponentsProvider value={mockComponents}>
      <MuiThemeProvider theme={theme}>
        <ProfileOrders
          orders={orders}
        />
      </MuiThemeProvider>
    </ComponentsProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
