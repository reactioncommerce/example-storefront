import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import CartToggle from "./CartToggle";

const uiStore = {
  toggleCartOpen() {}
};

test("basic snapshot", () => {
  const component = renderer.create(shallow(<CartToggle uiStore={uiStore} />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
