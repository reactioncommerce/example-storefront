import React from "react";
import renderer from "react-test-renderer";
import NavigationItemDesktop from "./NavigationItemDesktop";

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

test("renders with 1 level of tags", () => {
  const component = renderer.create(<NavigationItemDesktop navItem={mockNavItem} routingStore={mockRoutingStore} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders with 2 levels of tags", () => {
  const component = renderer.create(<NavigationItemDesktop navItem={mockNavItemWithSubItem} routingStore={mockRoutingStore} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders with 3 levels of tags", () => {
  const component = renderer.create(<NavigationItemDesktop navItem={mockNavItemWithSubItems} routingStore={mockRoutingStore} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
