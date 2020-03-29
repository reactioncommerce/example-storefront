import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import classNames from "classnames";
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
import Router from "translations/i18nRouter";
import Link from "components/Link";

const styles = (theme) => ({
  popover: {
    left: "0!important",
    maxWidth: "100vw",
    padding: theme.spacing(2),
    width: "100vw"
  },
  grid: {
    width: "100vw"
  },
  navigationShopAllLink: {
    display: "flex",
    textDecoration: "underline",
    fontSize: "14px",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    fontFamily: theme.typography.fontFamily
  },
  navigationShopAllLinkIcon: {
    fontSize: "12px"
  },
  primaryNavItem: {
    textTransform: "capitalize"
  }
});

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

    const currentNavItem = (providedNavItem && providedNavItem.navigationItem) || navItem.navigationItem;

    return routingStore.queryString !== ""
      ? `${currentNavItem.data.url}?${routingStore.queryString}`
      : `${currentNavItem.data.url}`;
  }

  get hasSubNavItems() {
    const { navItem: { items } } = this.props;
    return Array.isArray(items) && items.length > 0;
  }

  onClick = (event) => {
    event.preventDefault();

    if (this.hasSubNavItems) {
      this.setState({ isSubNavOpen: !this.state.isSubNavOpen });
    } else {
      const path = this.linkPath();
      Router.push(path);
    }
  };

  onClose = () => {
    this.setState({ isSubNavOpen: false });
  };

  renderSubNav(navItemGroup) {
    const menuItems = navItemGroup.items.map((item, index) => {
      const { navigationItem: { data: { contentForLanguage, classNames: navigationItemClassNames, isUrlRelative, shouldOpenInNewWindow } } } = item;
      return (
        <MenuItem dense key={index}>
          <Link
            className={navigationItemClassNames}
            onClick={this.onClose}
            route={this.linkPath(item)}
            href={this.linkPath(item)}
            isUrlAbsolute={!isUrlRelative}
            shouldOpenInNewWindow={shouldOpenInNewWindow}
          >
            <ListItemText primary={contentForLanguage} />
          </Link>
        </MenuItem>
      );
    });

    menuItems.unshift(<Divider key="divider" />);

    return menuItems;
  }

  renderPopover() {
    const { classes, navItem, navItem: { items, navigationItem } } = this.props;

    if (items) {
      return (
        <Popover
          classes={{ paper: classes.popover }}
          anchorReference="anchorPosition"
          anchorPosition={{ left: 0, top: 64 }}
          elevation={1}
          onClose={this.onClose}
          open={this.state.isSubNavOpen}
        >
          <Grid container className={classes.grid} spacing={2}>
            {items.map((item, index) => {
              const { navigationItem: { data: { contentForLanguage, classNames: navigationItemClassNames, isUrlRelative, shouldOpenInNewWindow } } } = item;
              return (
                <Grid item key={index}>
                  <MenuList disablePadding>
                    <MenuItem>
                      <Link
                        className={navigationItemClassNames}
                        href={this.linkPath(item)}
                        isUrlAbsolute={!isUrlRelative}
                        onClick={this.onClose}
                        shouldOpenInNewWindow={shouldOpenInNewWindow}
                      >
                        <ListItemText primary={contentForLanguage} />
                      </Link>
                    </MenuItem>
                    {Array.isArray(item.items) && this.renderSubNav(item)}
                  </MenuList>
                </Grid>
              );
            })}
          </Grid>
          <Link
            className={classes.navigationShopAllLink}
            onClick={this.onClose}
            route={this.linkPath(navItem)}
            href={this.linkPath(navItem)}
            isUrlAbsolute={!navigationItem.data.isUrlRelative}
            shouldOpenInNewWindow={navigationItem.data.shouldOpenInNewWindow}
          >
            <span>Shop all {navigationItem.data.contentForLanguage} <ChevronRight className={classes.navigationShopAllLinkIcon} /></span>
          </Link>
        </Popover>
      );
    }

    return null;
  }

  render() {
    const { classes: { primaryNavItem }, navItem, navItem: { navigationItem } } = this.props;

    return (
      <Fragment>
        <Button className={classNames(primaryNavItem, navigationItem.data.classNames)} color="inherit" onClick={this.onClick} href={this.linkPath(navItem)}>
          {navigationItem.data.contentForLanguage}
          {this.hasSubNavItems && <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment>}
        </Button>
        {this.hasSubNavItems && this.renderPopover()}
      </Fragment>
    );
  }
}

export default withStyles(styles)(inject("routingStore")(NavigationItemDesktop));
