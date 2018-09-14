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

const styles = (theme) => (theme.NavigationItemDesktop);

@inject("routingStore")
@withStyles(styles)
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
    return subTags && Array.isArray(subTags.edges) && subTags.edges.length > 0;
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
    return (
      <Fragment>
        <Divider />
        {navItemGroup.subTags.edges.map(({ node: navItem }, index) => (
          <MenuItem dense key={index}>
            <Link onClick={this.onClose} route={`${this.linkPath(navItem)}`}>
              <ListItemText primary={navItem.name} />
            </Link>
          </MenuItem>
        ))}
      </Fragment>
    );
  }

  renderPopover() {
    const { classes, navItem, navItem: { subTags } } = this.props;

    if (subTags) {
      return (
        <Popover
          classes={{ paper: classes.popover }}
          anchorReference={"anchorPosition"}
          anchorPosition={{ top: 64 }}
          elevation={1}
          onClose={this.onClose}
          open={this.state.isSubNavOpen}
        >
          <Grid container className={classes.grid} spacing={16}>
            {subTags.edges.map(({ node: navItemGroup }, index) => (
              <Grid item key={index}>
                <MenuList disablePadding>
                  <MenuItem>
                    <Link onClick={this.onClose} route={`${this.linkPath(navItemGroup)}`}>
                      <ListItemText primary={navItemGroup.name} />
                    </Link>
                  </MenuItem>
                  {navItemGroup.subTags && Array.isArray(navItemGroup.subTags.edges) && this.renderSubNav(navItemGroup)}
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
