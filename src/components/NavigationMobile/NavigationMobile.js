import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
import Slide from "@material-ui/core/Slide";
import withNavigationTags from "../../containers/tags/withNavigationTags";
import NavigationItemMobile from "./NavigationItemMobile";
import NavigationSubMenuMobile from "./NavigationSubMenuMobile";

const styles = (theme) => ({
  nav: {
    width: 320
  },
  subNav: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 320,
    height: "100vh",
    backgroundColor: theme.palette.background.default
  }
});

@withStyles(styles, { name: "SkNavigationMobile" })
@withNavigationTags
@inject("uiStore")
@observer
class NavigationMobile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object,
    uiStore: PropTypes.shape({
      closeMenuDrawer: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    classes: {},
    navItems: []
  };

  state = {
    navItem: null
  }

  handleNavItemClick = (navItem) => {
    this.setState({
      navItem
    });
  }

  handleCloseSubMenu = () => {
    this.setState({ navItem: null });
  }

  renderNavItem = (navItem, index) => {
    return (
      <NavigationItemMobile
        key={index}
        isTopLevel
        navItem={navItem.node}
        onClick={this.handleNavItemClick}
      />
    )
  }

  handleClose = () => {
    this.props.uiStore.closeMenuDrawer();
  };

  render() {
    const { classes, navItems, uiStore } = this.props;

    return (
      <Drawer open={uiStore.isMenuDrawerOpen} onClose={this.handleClose}>
        <nav className={classes.nav}>
          <MenuList>{navItems.edges && navItems.edges.map(this.renderNavItem)}</MenuList>
        </nav>
        <Slide direction="left" in={!!this.state.navItem}>
          <nav className={classes.subNav}>
            <NavigationSubMenuMobile
              navItem={this.state.navItem}
              onBackButtonClick={this.handleCloseSubMenu}
            />
          </nav>
        </Slide>
      </Drawer>
    );
  }
}

export default NavigationMobile;
