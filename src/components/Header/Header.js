import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Hidden from "material-ui/Hidden";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { DesktopNavigation, MobileNavigation, MobileNavigationToggle } from "components/Navigation";
import { CartToggle } from "components/Cart";

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

const styles = (theme) => ({
  controls: {
    alignItems: "inherit",
    display: "inherit",
    flex: 1
  },
  title: {
    marginRight: theme.spacing.unit
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between"
  }
});

@withStyles(styles)
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uiStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    uiStore: {}
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Hidden mdUp>
            <MobileNavigationToggle />
          </Hidden>

          <div className={classes.controls}>
            <Typography className={classes.title} color="inherit" variant="title">
              Reaction
            </Typography>

            <Hidden smDown>
              <DesktopNavigation navItems={tags} />
            </Hidden>
          </div>

          <CartToggle />
        </Toolbar>

        <MobileNavigation navItems={tags} />
      </AppBar>
    );
  }
}

export default Header;
