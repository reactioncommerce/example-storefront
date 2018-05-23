import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";

import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  subNav: {
    marginBottom: theme.spacing.unit * 2
  },
  listItemTextInset: {
    "&:first-child": {
      paddingLeft: theme.spacing.unit * 3
    }
  }
});

@withStyles(styles)
@observer
class NavigationItemMobile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItem: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItem: {}
  };

  get hasSubNavItems() {
    const { navItem: { subTags } } = this.props;
    return Array.isArray(subTags.edges) && subTags.edges.length > 0;
  }

  @observable _isSubNavOpen = false;

  @computed
  get isSubNavOpen() {
    return this._isSubNavOpen;
  }

  set isSubNavOpen(value) {
    this._isSubNavOpen = value;
  }

  @action
  onClick = () => {
    const { navItem } = this.props;

    if (this.hasSubNavItems) {
      this.isSubNavOpen = !this.isSubNavOpen;
    } else {
      Router.pushRoute("tag", { slug: navItem.name });
    }
  };

  renderSubNav(navItemGroup) {
    const { classes } = this.props;
    return (
      <div className={classes.subNav}>
        <Divider />
        {navItemGroup.subTags.edges.map(({ node: navItemGroupItem }, index) => (
          <MenuItem className={classes.nested} dense inset key={index}>
            <ListItemText classes={{ inset: classes.listItemTextInset }} inset primary={navItemGroupItem.name} />
          </MenuItem>
        ))}
      </div>
    );
  }

  renderCollapse() {
    const { classes, navItem: { subTags } } = this.props;
    return (
      <Collapse in={this.isSubNavOpen} timeout="auto" unmountOnExit>
        <MenuList component="div" disablePadding>
          {subTags.edges.map(({ node: navItemGroup }, index) => (
            <MenuList disablePadding key={index}>
              <MenuItem inset className={classes.nested}>
                <ListItemText classes={{ inset: classes.listItemTextInset }} inset primary={navItemGroup.name} />
              </MenuItem>
              {Array.isArray(navItemGroup.subTags.edges) && this.renderSubNav(navItemGroup)}
            </MenuList>
          ))}
        </MenuList>
      </Collapse>
    );
  }

  render() {
    const { classes, navItem } = this.props;
    return (
      <Fragment>
        <MenuItem color="inherit" onClick={this.onClick}>
          <ListItemText classes={{ primary: classes.primary }} primary={navItem.name} />
          {this.hasSubNavItems && (
            <ListItemIcon className={classes.icon}>
              {this.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ListItemIcon>
          )}
        </MenuItem>
        {this.hasSubNavItems && this.renderCollapse()}
      </Fragment>
    );
  }
}

export default NavigationItemMobile;
