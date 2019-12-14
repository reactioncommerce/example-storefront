import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import ResultsHeader from "./ResultsHeader";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<MuiThemeProvider theme={theme}><ResultsHeader /></MuiThemeProvider>).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
