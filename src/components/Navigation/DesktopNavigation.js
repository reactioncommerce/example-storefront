import React, { Component } from "react";
import PropTypes from "prop-types";

import { DesktopNavigationItem } from "components/Navigation";

class DesktopNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    classes: {},
    tags: []
  };

  renderNavItem(tag, index) {
    return <DesktopNavigationItem key={index} menuItem={tag} />;
  }

  render() {
    const { tags } = this.props;
    return <nav>{tags.map(this.renderNavItem)}</nav>;
  }
}

export default DesktopNavigation;
