import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import variant from "./__mocks__/variant.mock";
import VariantItem from "./VariantItem";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<VariantItem variant={variant.product} />).get(0));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
