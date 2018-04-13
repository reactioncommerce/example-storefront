import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import MenuList from "material-ui/Menu/MenuList";
import { MobileNavigationItem } from "components/Navigation";
import withNavigationTags from "../../containers/tags/withNavigationTags";

const styles = () => ({
  nav: {
    width: 320
  }
});

@withStyles(styles)
@withNavigationTags
@inject("uiStore")
@observer
class MobileNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object,
    uiStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItems: [],
    uiStore: {}
  };

  renderNavItem(navItem, index) {
    return <MobileNavigationItem key={index} navItem={navItem.node} />;
  }

  render() {
    const { classes, navItems, uiStore } = this.props;

    return (
      <Drawer open={uiStore.menuDrawerOpen} onClose={uiStore.toggleMenuDrawerOpen}>
        <nav className={classes.nav}>
          <MenuList>{navItems.edges && navItems.edges.map(this.renderNavItem)}</MenuList>
        </nav>
      </Drawer>
    );
  }
}

export default MobileNavigation;
