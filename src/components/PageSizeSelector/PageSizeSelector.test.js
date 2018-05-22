import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import PageSizeSelector from "./PageSizeSelector";

const uiStore = {
  pageSize: 20,
  setPageSize: jest.fn()
};


test("basic snapshot", () => {
  const component = renderer.create((
    <Provider uiStore={uiStore}>
      <PageSizeSelector />
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
