import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import NavigationToggleMobile from "./NavigationToggleMobile";

const uiStore = {
  toggleMenuDrawerOpen() {}
};

test("basic snapshot", () => {
  const component = renderer.create(shallow(<NavigationToggleMobile uiStore={uiStore} />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
