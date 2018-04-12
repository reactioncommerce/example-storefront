import React, { Component } from "react";
import PropTypes from "prop-types";

import { DesktopNavigationItem } from "components/Navigation";
import withNavigationTags from "../../containers/tags/withNavigationTags";

export class DesktopNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    classes: {},
    navItems: []
  };

  renderNavItem(navItem, index) {
    return <DesktopNavigationItem key={index} navItem={navItem.node} />;
  }

  render() {
    const { navItems } = this.props;
    return <nav>{navItems && navItems.edges && navItems.edges.map(this.renderNavItem)}</nav>;
  }
}

export default withNavigationTags(DesktopNavigation);
