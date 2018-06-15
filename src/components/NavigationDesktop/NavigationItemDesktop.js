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
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import { withStyles } from "@material-ui/core/styles";
import { Router } from "routes";
import Link from "components/Link";

const styles = (theme) => ({
  popover: {
    maxWidth: "100vw",
    padding: theme.spacing.unit * 2,
    width: "100vw"
  },
  grid: {
    width: "100vw"
  }
});

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

  get linkPath() {
    const { navItem, routingStore } = this.props;
    return routingStore.queryString !== ""
      ? `/tag/${navItem.slug}?${routingStore.queryString}`
      : `/tag/${navItem.slug}`;
  }

  get hasSubNavItems() {
    const { navItem: { subTags } } = this.props;
    return subTags && Array.isArray(subTags.edges) && subTags.edges.length > 0;
  }

  onClick = () => {
    const { navItem } = this.props;
    if (this.hasSubNavItems) {
      this.setState({ isSubNavOpen: !this.state.isSubNavOpen });
    } else {
      const path = this.linkPath;
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
            <Link route={`${this.linkPath}`}>
              <ListItemText primary={navItem.name} />
            </Link>
          </MenuItem>
        ))}
      </Fragment>
    );
  }

  renderPopover() {
    const { classes, navItem: { subTags } } = this.props;

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
                    <Link onAnchorClick={this.onClose} route={`${this.linkPath(navItemGroup)}`}>
                      <ListItemText primary={navItemGroup.name} />
                    </Link>
                  </MenuItem>
                  {navItemGroup.subTags && Array.isArray(navItemGroup.subTags.edges) && this.renderSubNav(navItemGroup)}
                </MenuList>
              </Grid>
            ))}
          </Grid>
        </Popover>
      );
    }

    return null;
  }

  render() {
    const { navItem } = this.props;

    return (
      <Fragment>
        <Button color="inherit" onClick={this.onClick}>
          {navItem.name}
          {this.hasSubNavItems && <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment>}
        </Button>
        {this.hasSubNavItems && this.renderPopover()}
      </Fragment>
    );
  }
}

export default NavigationItemDesktop;
