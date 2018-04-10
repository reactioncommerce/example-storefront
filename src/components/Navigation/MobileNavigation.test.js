import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import MobileNavigation from "./MobileNavigation";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<MobileNavigation />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
