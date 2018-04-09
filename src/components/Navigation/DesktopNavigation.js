import React, { Component } from "react";
import PropTypes from "prop-types";

import { DesktopNavigationItem } from "components/Navigation";

class DesktopNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    classes: {},
    navItems: []
  };

  renderNavItem(navItem, index) {
    return <DesktopNavigationItem key={index} navItem={navItem} />;
  }

  render() {
    const { navItems } = this.props;
    return <nav>{navItems.map(this.renderNavItem)}</nav>;
  }
}

export default DesktopNavigation;
