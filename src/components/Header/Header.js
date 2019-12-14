import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Hidden from "@material-ui/core/Hidden";
import { NavigationMobile } from "components/NavigationMobile";
import MiniCart from "components/MiniCart";
import Link from "components/Link";
import HamburgerIcon from "../Icons/HamburgerMenu";
import MenuItemsDesktop from "../MenuItemsDesktop/MenuItemsDesktop";
import SearchField from "../SearchField/SearchField";
import UserIcon from "../Icons/User";
import FavoriteIcon from "../Icons/Favorite";
import { CategoriesDrawer } from "../CategoriesDrawer";
import * as s from "./style";

const Header = inject("uiStore")(
  observer(({ uiStore }) => {
    const handleNavigationToggleClick = () => {
      uiStore.toggleMenuDrawerOpen();
    };

    return (
      <s.Content>
        <Hidden mdUp>
          <s.ToggleButton onClick={handleNavigationToggleClick}>
            <HamburgerIcon />
          </s.ToggleButton>
          <Link route={"/"}>
            <s.Logo alt={"Logo"} src={"../../static/images/logo.png"} />
          </Link>
          <MiniCart />
        </Hidden>

        <Hidden smDown>
          <s.DesktopHeader>
            <Link route={"/"}>
              <s.Logo alt={"Logo"} src={"../../static/images/logo.png"} />
            </Link>
            <MenuItemsDesktop />
            <SearchField desktopMode />
            <s.DesktopIcons>
              <Link route="/">
                <FavoriteIcon />
              </Link>
              <Link route="/">
                <UserIcon />
              </Link>
              <MiniCart />
            </s.DesktopIcons>
          </s.DesktopHeader>
        </Hidden>
        <CategoriesDrawer />
        <NavigationMobile />
      </s.Content>
    );
  })
);

Header.propTypes = {
  uiStore: PropTypes.shape({
    toggleMenuDrawerOpen: PropTypes.func.isRequired
  }).isRequired
};

export default Header;
