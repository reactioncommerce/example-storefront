import React from "react";
import renderer from "react-test-renderer";
import DesktopNavigation from "./DesktopNavigation";

test("basic snapshot", () => {
  const component = renderer.create(<DesktopNavigation />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
