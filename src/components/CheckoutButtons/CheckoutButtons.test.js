import React from "react";
import renderer from "react-test-renderer";
import CheckoutButtons from "./CheckoutButtons";

test("basic snapshot", () => {
  const component = renderer.create((
    <CheckoutButtons
      onClick={() => {}}
    />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
