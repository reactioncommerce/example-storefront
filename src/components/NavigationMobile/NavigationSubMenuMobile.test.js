import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import NavigationSubMenuMobile from "./NavigationSubMenuMobile";

const mockTagWithSubTags = {
  _id: "cmVhY3Rpb24vdGFnOjVXZE5LYXprejZ5TWdrcGY5",
  position: null,
  slug: "tag-slug",
  name: "Tag Name",
  subTags: [
    {
      node: {
        _id: "cmVhY3Rpb24vdGFnOlRFdjdSV1pDTHl1d1dmOWs2",
        position: null,
        slug: "sub-tag-slug",
        name: "Sub Tag Name",
        subTags: {
          edges: []
        }
      }
    },
    {
      node: {
        _id: "cmVhY3Rpb24vdGFnOmJ2MmVEbzV3V3lvNUdNMlN3",
        position: null,
        slug: "sub-tag-slug",
        name: "Sub Tag name",
        subTags: {
          edges: []
        }
      }
    }
  ]
};

const uiStore = {
  closeMenuDrawer() {},
  toggleMenuDrawerOpen() {}
};

const routingStore = {
  tagId: "v2hE7fzL6cJniwgSm"
};

test("basic snapshot", () => {
  const component = renderer.create((
    <Provider primaryShopId={"J8Bhq3uTtdgwZx3rz"} routingStore={routingStore} uiStore={uiStore}>
      <NavigationSubMenuMobile navItem={mockTagWithSubTags} />
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
