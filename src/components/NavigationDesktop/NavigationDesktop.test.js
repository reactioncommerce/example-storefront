import React from "react";
import renderer from "react-test-renderer";
import NavigationDesktop from "./NavigationDesktop";

test("basic snapshot", () => {
  const component = renderer.create(<NavigationDesktop />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
