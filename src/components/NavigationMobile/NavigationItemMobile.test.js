import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import NavigationItemMobile from "./NavigationItemMobile";

const mockNavItem = {
  items: [],
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

const mockNavItemWithSubItem = {
  items: [{
    items: [],
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

const mockRoutingStore = {
  queryString: ""
};

const uiStore = {
  toggleMenuDrawerOpen() { },
  closeMenuDrawer() { }
};

test("renders with 1 level of tags", () => {
  const component = renderer.create(shallow(<NavigationItemMobile navItem={mockNavItem} routingStore={mockRoutingStore} uiStore={uiStore} />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders with 2 levels of tags", () => {
  const component = renderer.create(<NavigationItemMobile navItem={mockNavItemWithSubItem} routingStore={mockRoutingStore} uiStore={uiStore} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders with 3 levels of tags", () => {
  const component = renderer.create(<NavigationItemMobile navItem={mockNavItemWithSubItems} routingStore={mockRoutingStore} uiStore={uiStore} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
