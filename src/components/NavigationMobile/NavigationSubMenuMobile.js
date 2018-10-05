import React, { Component } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";
import { withStyles } from "@material-ui/core/styles";
import NavigationItemMobile from "./NavigationItemMobile";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    flex: "0 0 auto"
  },
  toolbarTitle: {
    position: "absolute",
    width: "100%",
    textAlign: "center"
  },
  menu: {
    flex: "1 1 auto",
    overflowY: "auto"
  }
});

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
        <div className={classes.header}>
          <Toolbar disableGutters>
            <Typography className={classes.toolbarTitle} variant="subheading">{navItem.name}</Typography>
            <IconButton onClick={this.props.onBackButtonClick}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
        </div>
        <div className={classes.menu}>
          {this.hasSubNavItems &&
            <MenuList component="div" disablePadding>
              {navItem.subTags.edges.map(({ node: navItemGroup }, index) => (
                <NavigationItemMobile key={index} navItem={navItemGroup} />
              ))}
            </MenuList>
          }
        </div>
      </div>
    );
  }
}

export default NavigationSubMenuMobile;
