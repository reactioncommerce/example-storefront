import React, { Component } from "react";
import PropTypes from "prop-types";

import { NavigationItemDesktop } from "components/NavigationDesktop";
import withNavigationTags from "../../containers/tags/withNavigationTags";

export class NavigationDesktop extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object
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
    return <nav>{navItems && navItems.edges && navItems.edges.map(this.renderNavItem)}</nav>;
  }
}

export default withNavigationTags(NavigationDesktop);
