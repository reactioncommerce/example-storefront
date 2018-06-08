import React from "react";
import renderer from "react-test-renderer";
import Img from "./Img";

test("Img snapshot", () => {
  const component = renderer.create(<Img />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
