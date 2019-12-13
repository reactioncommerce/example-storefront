import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import ForgotPasswordForm from "./ForgotPasswordForm";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<MuiThemeProvider theme={theme}><ForgotPasswordForm /></MuiThemeProvider>).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});