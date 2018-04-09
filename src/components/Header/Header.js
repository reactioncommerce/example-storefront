import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import AppBar from "material-ui/AppBar";
import Hidden from "material-ui/Hidden";
import MenuList from "material-ui/Menu/MenuList";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import CartIcon from "mdi-material-ui/Cart";
import MenuIcon from "mdi-material-ui/Menu";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import HorizontalNavigationItem from "../NavigationItem/HorizontalNavigationItem";
import VerticalNavigationItem from "../NavigationItem/VerticalNavigationItem";

import { DesktopNavigation, MobileNavigation, MobileNavigationToggle } from "../Navigation";
import { Cart, CartToggle } from "../Cart";

const styles = () => ({
  menu: {
    flex: 1
  }
});

// TODO: Get tag data from GraphQL, this is just a sample
const tags = [
  { name: "men", title: "Men" },
  { name: "women", title: "Women" },
  {
    name: "kids",
    title: "Kids",
    relatedTags: [
      {
        name: "test1",
        title: "Test 1",
        relatedTags: [
          { name: "men", title: "Men" },
          { name: "women", title: "Women" },
          { name: "men", title: "Men" },
          { name: "women", title: "Women" }
        ]
      },
      {
        name: "test2",
        title: "Test 2",
        relatedTags: [
          { name: "men", title: "Men" },
          { name: "women", title: "Women" },
          { name: "men", title: "Men" },
          { name: "women", title: "Women" }
        ]
      },
      { name: "test3", title: "Test 3" }
    ]
  }
];

@withStyles(styles)
@inject("uiStore")
@observer
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uiStore: PropTypes.object
  };

  render() {
    const { classes, uiStore } = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Hidden mdUp>
            <MobileNavigationToggle />
          </Hidden>

          <Typography className={classes.title} color="inherit" variant="title">
            <Link href="/">Reaction</Link>
          </Typography>

          <nav className={classes.menu}>
            <Hidden smDown>{tags.map((tag, index) => <HorizontalNavigationItem key={index} menuItem={tag} />)}</Hidden>
          </nav>

          <DesktopNavigation tags={tags} />

          <CartToggle />
        </Toolbar>

        <Drawer open={uiStore.menuDrawerOpen} onClose={uiStore.toggleMenuDrawerOpen}>
          <div className={classes.cart}>
            <MenuList>{tags.map((tag, index) => <VerticalNavigationItem key={index} menuItem={tag} />)}</MenuList>
          </div>
        </Drawer>
      </AppBar>
    );
  }
}

export default Header;
