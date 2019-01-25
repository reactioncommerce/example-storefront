import React from "react";
import renderer from "react-test-renderer";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import components from "custom/componentsContext";
import Entry from "./";

test("basic snapshot", () => {
  const component = renderer.create(<ComponentsProvider value={components}>
    <MuiThemeProvider theme={theme}>
      <Entry setEmailOnAnonymousCart={() => {}} />
    </MuiThemeProvider>
  </ComponentsProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
