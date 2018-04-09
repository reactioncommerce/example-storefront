import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import ListItemText from "material-ui/List/ListItemText";
import Grid from "material-ui/Grid";
import MenuList from "material-ui/Menu/MenuList";
import MenuItem from "material-ui/Menu/MenuItem";
import Popover from "material-ui/Popover";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";

import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { withStyles } from "material-ui/styles";

const styles = (theme) => ({
  cart: {
    width: 320
  },
  menu: {
    flex: 1
  },
  paper: {
    padding: theme.spacing.unit,
    width: "100vw"
  }
});

@withStyles(styles)
@observer
class HorizontalNavigationItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    menuItem: PropTypes.object
  };

  @observable _popoverAnchor = null;

  @computed
  get popoverAnchor() {
    return this._popoverAnchor;
  }

  @computed
  get hasPopover() {
    return Boolean(this._popoverAnchor);
  }

  @action
  onClick = (event) => {
    const { menuItem } = this.props;
    const { relatedTags } = menuItem;
    const hasRelatedTags = Array.isArray(relatedTags) && relatedTags.length > 0;

    if (hasRelatedTags) {
      this._popoverAnchor = event.target;
    } else {
      Router.push(`/tag/${menuItem.name}`);
    }
  };

  @action
  onClose = () => {
    this._popoverAnchor = null;
  };

  render() {
    const { classes, menuItem } = this.props;
    const { relatedTags } = menuItem;
    const hasRelatedTags = Array.isArray(relatedTags) && relatedTags.length > 0;

    return (
      <Fragment>
        <Button color="inherit" onClick={this.onClick}>
          {menuItem.name}
          {hasRelatedTags && <Fragment>{this.hasPopover ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment>}
        </Button>

        {hasRelatedTags && (
          <Popover
            anchorEl={this.popoverAnchor}
            anchorOrigin={{ vertical: "bottom" }}
            onClose={this.onClose}
            open={this.hasPopover}
          >
            <Grid container className={classes.paper} spacing={16}>
              {relatedTags.map((menuItemGroup, index) => (
                <Grid item key={index}>
                  <MenuList disablePadding key={index}>
                    <MenuItem className={classes.nested}>
                      <Button href={`/tag/${menuItemGroup.name}`}>{menuItemGroup.title}</Button>
                    </MenuItem>

                    {Array.isArray(menuItemGroup.relatedTags) && (
                      <div>
                        <Divider />
                        {menuItemGroup.relatedTags.map((menuItemGroupItem, i) => (
                          <MenuItem className={classes.nested} dense key={i}>
                            <Button href={`/tag/${menuItemGroupItem.name}`}>{menuItemGroupItem.name}</Button>
                          </MenuItem>
                        ))}
                      </div>
                    )}
                  </MenuList>
                </Grid>
              ))}
            </Grid>
          </Popover>
        )}
      </Fragment>
    );
  }
}

export default HorizontalNavigationItem;
