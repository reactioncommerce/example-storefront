import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { shallow } from "enzyme";
import theme from "lib/theme/reactionTheme";
import NavigationMobile from "./NavigationMobile";

test("basic snapshot", () => {
  const component = renderer.create(shallow((
    <MuiThemeProvider theme={theme}>
      <NavigationMobile />
    </MuiThemeProvider>
  )).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
