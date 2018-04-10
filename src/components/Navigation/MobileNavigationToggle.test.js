import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import MobileNavigationToggle from "./MobileNavigationToggle";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<MobileNavigationToggle />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
