import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import NavigationSubMenuMobile from "./NavigationSubMenuMobile";

const mockNavItemWithSubItems = {
  items: [{
    items: [{
      items: [],
      navigationItem: {
        data: {
          classNames: null,
          content: [{
            language: "en",
            value: "NavSubSubItem"
          }],
          isUrlRelative: true,
          shouldOpenInNewWindow: false,
          url: "/nav-sub-sub-item"
        }
      }
    }],
    navigationItem: {
      data: {
        classNames: null,
        content: [{
          language: "en",
          value: "NavSubItem"
        }],
        isUrlRelative: true,
        shouldOpenInNewWindow: false,
        url: "/nav-sub-item"
      }
    }
  }],
  navigationItem: {
    data: {
      classNames: null,
      content: [{
        language: "en",
        value: "NavItem"
      }],
      isUrlRelative: true,
      shouldOpenInNewWindow: false,
      url: "/nav-item"
    }
  }
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
      <NavigationSubMenuMobile navItem={mockNavItemWithSubItems} />
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
