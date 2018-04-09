import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import AppBar from "material-ui/AppBar";
import Hidden from "material-ui/Hidden";

import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import { withStyles } from "material-ui/styles";
import HorizontalNavigationItem from "../NavigationItem/HorizontalNavigationItem";

import { DesktopNavigation, MobileNavigation, MobileNavigationToggle } from "components/Navigation";
import { CartToggle } from "components/Cart";

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
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uiStore: PropTypes.object
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Hidden mdUp />

          <MobileNavigationToggle />

          <Typography className={classes.title} color="inherit" variant="title">
            <Link href="/">
              <a>Reaction</a>
            </Link>
          </Typography>

          <nav className={classes.menu}>
            <Hidden smDown>{tags.map((tag, index) => <HorizontalNavigationItem key={index} menuItem={tag} />)}</Hidden>
          </nav>

          <DesktopNavigation tags={tags} />

          <CartToggle />
        </Toolbar>

        <MobileNavigation tags={tags} />
      </AppBar>
    );
  }
}

export default Header;
