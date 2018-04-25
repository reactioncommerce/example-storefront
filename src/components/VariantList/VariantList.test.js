import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import catalogProduct from "components/ProductDetail/__mocks__/productData.mock";
import VariantList from "./VariantList";

test("basic snapshot", () => {
  const variants = catalogProduct.variants.filter((variant) => variant.ancestorIds.length === 1);
  const component = renderer.create(shallow((
    <VariantList
      product={catalogProduct}
      variants={variants}
    />)).get(0));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
