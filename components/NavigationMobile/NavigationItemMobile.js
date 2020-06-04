import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import inject from "hocs/inject";
import Router from "translations/i18nRouter";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import MenuList from "@material-ui/core/MenuList";
import ListItem from "@material-ui/core/ListItem";
import ChevronRightIcon from "mdi-material-ui/ChevronRight";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import { withStyles } from "@material-ui/core/styles";
import Link from "components/Link";

const styles = (theme) => ({
  subNav: {
    marginBottom: theme.spacing(2)
  },
  listItemRoot: {
    paddingTop: 16,
    paddingBottom: 16
  },
  listItemDense: {
    paddingTop: 4,
    paddingBottom: 4
  },
  listItemTextDense: {
    fontWeight: 400
  },
  listItemGutters: {
    paddingRight: 0
  },
  subMenuList: {
    paddingBottom: theme.spacing(2)
  }
});

class NavigationItemMobile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isTopLevel: PropTypes.bool,
    navItem: PropTypes.object,
    onClick: PropTypes.func,
    routingStore: PropTypes.object,
    shouldShowDivider: PropTypes.bool,
    uiStore: PropTypes.shape({
      closeMenuDrawer: PropTypes.func.isRequired
    })
  };

  static defaultProps = {
    classes: {},
    isTopLevel: false,
    navItem: {},
    onClick() {},
    routingStore: {},
    shouldShowDivider: true
  };

  state = { isSubNavOpen: false };

  get linkPath() {
    const { navItem, routingStore } = this.props;
    return routingStore.queryString !== ""
      ? `${navItem.navigationItem.data.url}?${routingStore.queryString}`
      : `${navItem.navigationItem.data.url}`;
  }

  get hasSubNavItems() {
    const { navItem: { items } } = this.props;
    return Array.isArray(items) && items.length > 0;
  }

  onClick = () => {
    const { navItem, uiStore, isTopLevel } = this.props;

    if (isTopLevel && this.hasSubNavItems) {
      this.props.onClick(navItem);
    } else if (this.hasSubNavItems) {
      this.setState({ isSubNavOpen: !this.state.isSubNavOpen });
    } else {
      const path = this.linkPath;
      Router.push(path, { slug: navItem.slug });
      uiStore.closeMenuDrawer();
    }
  };

  onClose = () => {
    this.setState({ isSubNavOpen: false });
  };

  renderSubNav() {
    const { classes, isTopLevel, navItem: { items }, uiStore, routingStore } = this.props;

    if (this.hasSubNavItems && !isTopLevel) {
      return (
        <Collapse in={this.state.isSubNavOpen} timeout="auto" unmountOnExit>
          <MenuList className={classes.subMenuList} component="div" disablePadding>
            {items.map((item, index) => {
              const { navigationItem: { data: { classNames: navigationItemClassNames, isUrlRelative, shouldOpenInNewWindow } } } = item;

              return (
                <Link
                  className={navigationItemClassNames}
                  href={this.linkPath}
                  isUrlAbsolute={!isUrlRelative}
                  onClick={this.onClick}
                  shouldOpenInNewWindow={shouldOpenInNewWindow}
                >
                  <NavigationItemMobile
                    key={index}
                    classes={classes}
                    navItem={item}
                    routingStore={routingStore}
                    shouldShowDivider={false}
                    uiStore={uiStore}
                  />
                </Link>
              );
            })}
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
    const { classes, navItem: { navigationItem: { data } }, shouldShowDivider } = this.props;

    const listItemClasses = classNames(
      data.classNames,
      {
        root: classes.listItemRoot,
        dense: classes.listItemDense,
        gutters: classes.listItemGutters
      }
    );

    return (
      <Fragment>
        <ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={this.onClick}
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={data.contentForLanguage}
          />
          {this.renderIcon()}
        </ListItem>
        {this.renderSubNav()}
        {shouldShowDivider && <Divider />}
      </Fragment>
    );
  }
}

export default withStyles(styles)(inject("routingStore", "uiStore")(NavigationItemMobile));
