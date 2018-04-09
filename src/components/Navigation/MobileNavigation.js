import React, { Component } from "react";
import PropTypes from "prop-types";

import { inject, observer } from "mobx-react";

import { withStyles } from "material-ui/styles";

import Drawer from "material-ui/Drawer";
import MenuList from "material-ui/Menu/MenuList";

import VerticalNavigationItem from "../NavigationItem/VerticalNavigationItem";

const styles = () => ({
  nav: {
    width: 320
  }
});

@withStyles(styles)
@inject("uiStore")
@observer
class MobileNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.object),
    uiStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    tags: [],
    uiStore: {}
  };

  renderNavItem(tag, index) {
    return <VerticalNavigationItem key={index} menuItem={tag} />;
    // return <p>{tag.name}</p>;
  }

  render() {
    const { classes, tags, uiStore } = this.props;

    return (
      <Drawer open={uiStore.menuDrawerOpen} onClose={uiStore.toggleMenuDrawerOpen}>
        <nav className={classes.nav}>
          <MenuList>{tags.map(this.renderNavItem)}</MenuList>
        </nav>
      </Drawer>
    );
  }
}

export default MobileNavigation;
