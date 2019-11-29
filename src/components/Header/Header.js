import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Hidden from "@material-ui/core/Hidden";
import { NavigationMobile } from "components/NavigationMobile";
import MiniCart from "components/MiniCart";
import HamburgerIcon from "../Icons/HamburgerMenu";
import MenuItemsDesktop from "../MenuItemsDesktop/MenuItemsDesktop";
import * as s from "./style";

const Header = inject("uiStore")(
  observer(({ uiStore }) => {
    const handleNavigationToggleClick = () => {
      uiStore.toggleMenuDrawerOpen();
    };

    return (
      <div>
        <s.Content>
          <Hidden mdUp>
            <s.ToggleButton onClick={handleNavigationToggleClick}>
              <HamburgerIcon />
            </s.ToggleButton>
          </Hidden>
          <s.Logo alt={"Logo"} src={"../../static/images/logo.png"} />

          <Hidden smDown initialWidth={"md"}>
            <MenuItemsDesktop />
          </Hidden>

          <MiniCart />
          <NavigationMobile />
        </s.Content>
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
