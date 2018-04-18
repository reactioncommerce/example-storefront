import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import NavigationMobile from "./NavigationMobile";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<NavigationMobile />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
