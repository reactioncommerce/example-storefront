import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Hidden from "@material-ui/core/Hidden";
import { NavigationMobile } from "components/NavigationMobile";
import MiniCart from "components/MiniCart";
import Link from "components/Link";
import HamburgerIcon from "../Icons/HamburgerMenu";
import MenuItemsDesktop from "../MenuItemsDesktop/MenuItemsDesktop";
import * as styles from "./style";

const Header = inject("uiStore")(
  observer(({ uiStore }) => {
    const handleNavigationToggleClick = () => {
      uiStore.toggleMenuDrawerOpen();
    };

    return (
      <div>
        <styles.Content>
          <Hidden mdUp>
            <styles.ToggleButton onClick={handleNavigationToggleClick}>
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
      </div>
    );
  })
);

Header.propTypes = {
  uiStore: PropTypes.shape({
    toggleMenuDrawerOpen: PropTypes.func.isRequired
  }).isRequired
};

export default Header;
