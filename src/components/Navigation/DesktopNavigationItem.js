import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import Grid from "material-ui/Grid";
import ListItemText from "material-ui/List/ListItemText";
import MenuList from "material-ui/Menu/MenuList";
import MenuItem from "material-ui/Menu/MenuItem";
import Popover from "material-ui/Popover";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";

import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { withStyles } from "material-ui/styles";
import { Router } from "../../routes";

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

@withStyles(styles)
@observer
class DesktopNavigationItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItem: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItem: {}
  };

  get hasSubNavItems() {
    const { navItem: { relatedTags } } = this.props;
    return Array.isArray(relatedTags) && relatedTags.length > 0;
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

  @action
  onClose = () => {
    this.isSubNavOpen = false;
  };

  renderSubNav(navItemGroup) {
    return (
      <Fragment>
        <Divider />
        {navItemGroup.relatedTags.map((navItem, index) => (
          <MenuItem dense key={index}>
            <ListItemText primary={navItem.title} />
          </MenuItem>
        ))}
      </Fragment>
    );
  }

  renderPopover() {
    const { classes, navItem: { relatedTags } } = this.props;
    return (
      <Popover
        classes={{ paper: classes.popover }}
        anchorReference={"anchorPosition"}
        anchorPosition={{ top: 64 }}
        elevation={1}
        onClose={this.onClose}
        open={this.isSubNavOpen}
      >
        <Grid container className={classes.grid} spacing={16}>
          {relatedTags.map((navItemGroup, index) => (
            <Grid item key={index}>
              <MenuList disablePadding>
                <MenuItem>
                  <ListItemText primary={navItemGroup.title} />
                </MenuItem>
                {Array.isArray(navItemGroup.relatedTags) && this.renderSubNav(navItemGroup)}
              </MenuList>
            </Grid>
          ))}
        </Grid>
      </Popover>
    );
  }

  render() {
    const { navItem } = this.props;
    return (
      <Fragment>
        <Button color="inherit" onClick={this.onClick}>
          {navItem.name}
          {this.hasSubNavItems && <Fragment>{this.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment>}
        </Button>
        {this.hasSubNavItems && this.renderPopover()}
      </Fragment>
    );
  }
}

export default DesktopNavigationItem;
