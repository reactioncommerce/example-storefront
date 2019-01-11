import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";

import { NavigationItemDesktop } from "components/NavigationDesktop";

@inject("navItems")
export class NavigationDesktop extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItems: {}
  };

  renderNavItem(navItem, index) {
    return <NavigationItemDesktop key={index} navItem={navItem} />;
  }

  render() {
    const { navItems } = this.props;

    if (navItems && navItems.items) {
      return <nav>{navItems.items.map(this.renderNavItem)}</nav>;
    }

    // If navItems.items aren't available, skip rendering of navigation
    return null;
  }
}

export default NavigationDesktop;
