import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";

import { NavigationItemDesktop } from "components/NavigationDesktop";

@inject("navItems")
export class NavigationDesktop extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.array
  };

  static defaultProps = {
    classes: {},
    navItems: []
  };

  renderNavItem(navItem, index) {
    return <NavigationItemDesktop key={index} navItem={navItem.node} />;
  }

  render() {
    const { navItems } = this.props;
    return <nav>{navItems.map(this.renderNavItem)}</nav>;
  }
}

export default NavigationDesktop;
