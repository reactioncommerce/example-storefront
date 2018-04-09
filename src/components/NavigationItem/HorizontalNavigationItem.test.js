import React from "react";
import renderer from "react-test-renderer";
import HorizontalNavigationItem from "./HorizontalNavigationItem";

test("basic snapshot", () => {
  const component = renderer.create(<HorizontalNavigationItem />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
