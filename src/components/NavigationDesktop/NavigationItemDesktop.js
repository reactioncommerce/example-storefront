import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronRight from "mdi-material-ui/ChevronRight";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import { withStyles } from "@material-ui/core/styles";
import { Router } from "routes";
import Link from "components/Link";

const styles = (theme) => ({
  popover: {
    left: "0!important",
    maxWidth: "100vw",
    padding: theme.spacing.unit * 2,
    width: "100vw"
  },
  grid: {
    width: "100vw"
  },
  navigationShopAllLink: {
    display: "flex",
    textDecoration: "underline",
    fontSize: "14px",
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
    fontFamily: theme.typography.fontFamily
  },
  navigationShopAllLinkIcon: {
    fontSize: "12px"
  },
  primaryNavItem: {
    textTransform: "capitalize"
  }
});

@inject("routingStore")
@withStyles(styles, { name: "SkNavigationItemDesktop" })
class NavigationItemDesktop extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItem: PropTypes.object,
    routingStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItem: {},
    routingStore: {}
  };

  state = { isSubNavOpen: false };

  linkPath = (providedNavItem) => {
    const { navItem, routingStore } = this.props;

    const currentNavItem = providedNavItem || navItem;

    return routingStore.queryString !== ""
      ? `/tag/${currentNavItem.slug}?${routingStore.queryString}`
      : `/tag/${currentNavItem.slug}`;
  }

  get hasSubNavItems() {
    const { navItem: { subTags } } = this.props;
    return Array.isArray(subTags) && subTags.length > 0;
  }

  onClick = (event) => {
    event.preventDefault();

    const { navItem } = this.props;
    if (this.hasSubNavItems) {
      this.setState({ isSubNavOpen: !this.state.isSubNavOpen });
    } else {
      const path = this.linkPath();
      Router.pushRoute(path, { slug: navItem.slug });
    }
  };

  onClose = () => {
    this.setState({ isSubNavOpen: false });
  };

  renderSubNav(navItemGroup) {
    const menuItems = navItemGroup.subTags.map(({ node: navItem }, index) => (
      <MenuItem dense key={index}>
        <Link onClick={this.onClose} route={`${this.linkPath(navItem)}`}>
          <ListItemText primary={navItem.name} />
        </Link>
      </MenuItem>
    ));

    menuItems.unshift(<Divider key="divider" />);

    return menuItems;
  }

  renderPopover() {
    const { classes, navItem, navItem: { subTags } } = this.props;

    if (subTags) {
      return (
        <Popover
          classes={{ paper: classes.popover }}
          anchorReference="anchorPosition"
          anchorPosition={{ left: 0, top: 64 }}
          elevation={1}
          onClose={this.onClose}
          open={this.state.isSubNavOpen}
        >
          <Grid container className={classes.grid} spacing={16}>
            {subTags.map(({ node: navItemGroup }, index) => (
              <Grid item key={index}>
                <MenuList disablePadding>
                  <MenuItem>
                    <Link onClick={this.onClose} route={`${this.linkPath(navItemGroup)}`}>
                      <ListItemText primary={navItemGroup.name} />
                    </Link>
                  </MenuItem>
                  {Array.isArray(navItemGroup.subTags) && this.renderSubNav(navItemGroup)}
                </MenuList>
              </Grid>
            ))}
          </Grid>
          <Link className={classes.navigationShopAllLink} onClick={this.onClose} route={`${this.linkPath()}`}>
            <span>Shop all {navItem.name} <ChevronRight className={classes.navigationShopAllLinkIcon} /></span>
          </Link>
        </Popover>
      );
    }

    return null;
  }

  render() {
    const { classes: { primaryNavItem }, navItem } = this.props;

    return (
      <Fragment>
        <Button className={primaryNavItem} color="inherit" onClick={this.onClick} href={this.linkPath(navItem)}>
          {navItem.name}
          {this.hasSubNavItems && <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment>}
        </Button>
        {this.hasSubNavItems && this.renderPopover()}
      </Fragment>
    );
  }
}

export default NavigationItemDesktop;
