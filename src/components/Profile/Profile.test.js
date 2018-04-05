
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Profile } from "./Profile";

const props = {
  viewer: {
    name: "Test User"
  }
}

test("basic snapshot", () => {
  const component = renderer.create(<Profile {...props} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
