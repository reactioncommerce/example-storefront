import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import NavigationDesktop from "./NavigationDesktop";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<NavigationDesktop primaryShopId="1234" navItems={[]} />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
