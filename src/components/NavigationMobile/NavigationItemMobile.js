import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { Router } from "routes";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ChevronRightIcon from "mdi-material-ui/ChevronRight";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  subNav: {
    marginBottom: theme.spacing.unit * 2
  }
});

@inject("routingStore")
@withStyles(styles, { name: "SkNavigationItemMobile" })
class NavigationItemMobile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isTopLevel: PropTypes.bool,
    navItem: PropTypes.object,
    onClick: PropTypes.func,
    routingStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItem: {},
    onClick() {},
    routingStore: {}
  };

  state = { isSubNavOpen: false };

  get linkPath() {
    const { navItem, routingStore } = this.props;
    return routingStore.queryString !== ""
      ? `/tag/${navItem.slug}?${routingStore.queryString}`
      : `/tag/${navItem.slug}`;
  }

  get hasSubNavItems() {
    const { navItem: { subTags } } = this.props;
    return Array.isArray(subTags.edges) && subTags.edges.length > 0;
  }

  onClick = () => {
    const { navItem, isTopLevel } = this.props;

    if (isTopLevel && this.hasSubNavItems) {
      this.props.onClick(navItem);
    } else if (this.hasSubNavItems) {
      this.setState({ isSubNavOpen: !this.state.isSubNavOpen });
    } else {
      const path = this.linkPath;
      Router.pushRoute(path, { slug: navItem.slug });
    }
  };

  onClose = () => {
    this.setState({ isSubNavOpen: false });
  };

  renderSubNav() {
    const { classes, isTopLevel, navItem: { subTags } } = this.props;

    if (this.hasSubNavItems && !isTopLevel) {
      return (
        <Collapse in={this.state.isSubNavOpen} timeout="auto" unmountOnExit>
          <MenuList component="div" disablePadding>
            {subTags.edges.map(({ node: navItemGroup }, index) => (
              <MenuItem className={classes.nested} dense key={index}>
                <ListItemText primary={navItemGroup.name} />
              </MenuItem>
            ))}
          </MenuList>
        </Collapse>
      );
    }

    return null;
  }

  renderIcon() {
    const { classes, isTopLevel } = this.props;
    const { isSubNavOpen } = this.state;
    let icon = null;

    if (this.hasSubNavItems) {
      if (isTopLevel) {
        icon = <ChevronRightIcon />;
      } else if (isSubNavOpen) {
        icon = <ChevronUpIcon />;
      } else {
        icon = <ChevronDownIcon />;
      }
    }

    if (icon) {
      return <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>;
    }

    return null;
  }

  render() {
    const { classes, navItem } = this.props;
    return (
      <Fragment>
        <MenuItem color="inherit" onClick={this.onClick}>
          <ListItemText classes={{ primary: classes.primary }} primary={navItem.name} />
          {this.renderIcon()}
        </MenuItem>
        {this.renderSubNav()}
        <Divider />
      </Fragment>
    );
  }
}

export default NavigationItemMobile;
