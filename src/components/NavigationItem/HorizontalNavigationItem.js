import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import ListItemIcon from "material-ui/List/ListItemIcon";
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
  // nested: {
  //   marginLeft: theme.spacing.unit * 2
  // },
  subMenuGroup: {
    marginBottom: theme.spacing.unit * 2
  },
  listItemTextInset: {
    "&:first-child": {
      paddingLeft: theme.spacing.unit * 3
    }
  },
  paper: {
    padding: theme.spacing.unit,
    width: "100vw"
  }
});

@withStyles(styles)
@observer
class NavigationItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    menuItem: PropTypes.object
  }

  @observable _open = false

  @computed get open() { return this._open; }
  set open(value) { this._open = value; }

  @action handleMenuItemClick = () => {
    const { menuItem } = this.props;
    const { relatedTags } = menuItem;
    const hasRelatedTags = Array.isArray(relatedTags) && relatedTags.length > 0;

    if (hasRelatedTags) {
      this.open = !this.open;
    } else {
      Router.push(`/tag/${menuItem.name}`);
    }
  }

  @observable _popoverAnchor = null

  @computed get popoverAnchor() { return this._popoverAnchor; }

  @action onClick = (event) => {
    this._popoverAnchor = event.target;
  }

  @action onClose = () => {
    this._popoverAnchor = null;
  }

  render() {
    const { classes, menuItem } = this.props;
    const { relatedTags } = menuItem;
    const hasRelatedTags = Array.isArray(relatedTags) && relatedTags.length > 0;

    return (
      <Fragment>
        <Button
          color="inherit"
          onClick={this.onClick}
        >
          {menuItem.name}
          {hasRelatedTags &&
            <Fragment>
              {Boolean(this.popoverAnchor) ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Fragment>
          }
        </Button>

        {hasRelatedTags &&
          <Popover anchorEl={this.popoverAnchor} anchorOrigin={{ vertical: "bottom" }} onClose={this.onClose} open={Boolean(this.popoverAnchor)}>
              <Grid container className={classes.paper} spacing={16}>
                    {relatedTags.map((menuItemGroup, index) => (
                      <Grid item>
                        <MenuList disablePadding key={index}>
                        <MenuItem className={classes.nested}>
                          <ListItemText
                            classes={{ inset: classes.listItemTextInset }}
                            primary={menuItemGroup.name}
                            />
                        </MenuItem>

                        {Array.isArray(menuItemGroup.relatedTags) &&
                          <div>
                              <Divider />
                                {menuItemGroup.relatedTags.map((menuItemGroupItem, i) => (
                                  <MenuItem
                                    className={classes.nested}
                                    dense
                                    key={i}
                                    >
                                    <ListItemText
                                      classes={{ inset: classes.listItemTextInset }}
                                      primary={menuItemGroupItem.name}
                                      />
                                  </MenuItem>
                                ))}
                         </div>
                        }
                      </MenuList>
                      </Grid>
                    ))}
            </Grid>
          </Popover>
        }
      </Fragment>
    );
  }
}

export default NavigationItem;
