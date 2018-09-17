import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import Entry from "./";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<MuiThemeProvider theme={theme}>
    <Entry />
  </MuiThemeProvider>).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
