import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import AccountDropdown from "./AccountDropdown";

const authStore = {
  token: "1234"
};

test("basic snapshot", () => {
  const component = renderer.create(shallow(<AccountDropdown authStore={authStore} />).get(0));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
