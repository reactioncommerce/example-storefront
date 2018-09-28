import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";
import { withStyles } from "@material-ui/core/styles";
import NavigationItemMobile from "./NavigationItemMobile";

const styles = () => ({
  root: {} // Blank, but still allows for
});

@inject("routingStore")
@withStyles(styles, { name: "SkNavigationItemMobile" })
class NavigationSubMenuMobile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItem: PropTypes.object,
    onBackButtonClick: PropTypes.func,
    routingStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItem: {},
    onBackButtonClick() {},
    routingStore: {}
  };

  state = { isSubNavOpen: false };

  get hasSubNavItems() {
    const { navItem: { subTags } } = this.props;
    return Array.isArray(subTags.edges) && subTags.edges.length > 0;
  }

  render() {
    const { classes, navItem } = this.props;

    if (!navItem) {
      return null;
    }

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar disableGutters>
            <IconButton onClick={this.props.onBackButtonClick}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="subheading">{navItem.name}</Typography>
          </Toolbar>
        </AppBar>
        {this.hasSubNavItems &&
          <MenuList component="div" disablePadding>
            {navItem.subTags.edges.map(({ node: navItemGroup }, index) => (
              <NavigationItemMobile key={index} navItem={navItemGroup} />
            ))}
          </MenuList>
        }
      </div>
    );
  }
}

export default NavigationSubMenuMobile;
