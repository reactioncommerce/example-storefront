import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import { NavigationMobile } from "components/NavigationMobile";
import MiniCart from "components/MiniCart";
import Link from "components/Link";
import HamburgerIcon from "../Icons/HamburgerMenu";
import MenuItemsDesktop from "../MenuItemsDesktop/MenuItemsDesktop";
import * as styles from "./style";

@withStyles(styles, { name: "SkHeader" })
@inject("uiStore")
class Header extends Component {
  static propTypes = {
    uiStore: PropTypes.shape({
      toggleMenuDrawerOpen: PropTypes.func.isRequired
    }).isRequired
  };

  handleNavigationToggleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };

  render() {
    return (
      <styles.Container>
        <styles.Content>
          <Hidden mdUp>
            <styles.ToggleButton onClick={this.handleNavigationToggleClick}>
              <HamburgerIcon />
            </styles.ToggleButton>
          </Hidden>
          <Link route={"/"}>
            <styles.Logo alt={"Logo"} src={"../../static/images/logo.png"} />
          </Link>

          <Hidden smDown initialWidth={"md"}>
            <MenuItemsDesktop />
          </Hidden>

          <MiniCart />
          <NavigationMobile />
        </styles.Content>
      </styles.Container>
    );
  }
}

export default Header;
