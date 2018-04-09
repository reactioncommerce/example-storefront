import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Divider from "material-ui/Divider";
import ListItemIcon from "material-ui/List/ListItemIcon";
import ListItemText from "material-ui/List/ListItemText";
import Collapse from "material-ui/transitions/Collapse";
import MenuList from "material-ui/Menu/MenuList";
import MenuItem from "material-ui/Menu/MenuItem";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";

import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { withStyles } from "material-ui/styles";

const styles = (theme) => ({
  subMenuGroup: {
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
class MobileNavigationItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    menuItem: PropTypes.object
  };

  @observable _open = false;

  @computed
  get open() {
    return this._open;
  }
  set open(value) {
    this._open = value;
  }

  @action
  handleMenuItemClick = () => {
    const { menuItem } = this.props;
    const { relatedTags } = menuItem;
    const hasRelatedTags = Array.isArray(relatedTags) && relatedTags.length > 0;

    if (hasRelatedTags) {
      this.open = !this.open;
    } else {
      Router.push(`/tag/${menuItem.name}`);
    }
  };

  render() {
    const { classes, menuItem } = this.props;
    const { relatedTags } = menuItem;
    const hasRelatedTags = Array.isArray(relatedTags) && relatedTags.length > 0;

    return (
      <Fragment>
        <MenuItem color="inherit" onClick={this.handleMenuItemClick}>
          <ListItemText classes={{ primary: classes.primary }} primary={menuItem.name} />
          {hasRelatedTags && (
            <ListItemIcon className={classes.icon}>{this.open ? <ChevronUpIcon /> : <ChevronDownIcon />}</ListItemIcon>
          )}
        </MenuItem>

        {hasRelatedTags && (
          <Collapse in={this.open} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>
              {relatedTags.map((menuItemGroup, index) => (
                <MenuList disablePadding key={index}>
                  <MenuItem inset className={classes.nested}>
                    <ListItemText classes={{ inset: classes.listItemTextInset }} inset primary={menuItemGroup.name} />
                  </MenuItem>

                  {Array.isArray(menuItemGroup.relatedTags) && (
                    <div className={classes.subMenuGroup}>
                      <Divider />
                      {menuItemGroup.relatedTags.map((menuItemGroupItem, i) => (
                        <MenuItem className={classes.nested} dense inset key={i}>
                          <ListItemText
                            classes={{ inset: classes.listItemTextInset }}
                            inset
                            primary={menuItemGroupItem.name}
                          />
                        </MenuItem>
                      ))}
                    </div>
                  )}
                </MenuList>
              ))}
            </MenuList>
          </Collapse>
        )}
      </Fragment>
    );
  }
}

export default MobileNavigationItem;
