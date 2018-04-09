import React, { Component } from "react";
import PropTypes from "prop-types";

class DesktopNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    classes: {},
    tags: []
  };

  renderNavDropdown(tag, index) {}

  renderNavItem(tag, index) {
    return <p key={index}>{tag.title}</p>;
  }

  render() {
    const { tags } = this.props;
    return <nav>{tags.map(this.renderNavItem)}</nav>;
  }
}

export default DesktopNavigation;
