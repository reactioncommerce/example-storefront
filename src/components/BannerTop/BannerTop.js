import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Hidden from "@material-ui/core/Hidden";
import { NavigationMobile } from "components/NavigationMobile";
import MiniCart from "components/MiniCart";
import HamburgerIcon from "../Icons/HamburgerMenu";
import MenuItemsDesktop from "../MenuItemsDesktop/MenuItemsDesktop";
import * as styles from "./style";

const BannerTop = inject("uiStore")(
  observer(({ uiStore }) => {
    return (
      <styles.Banner>
          <styles.Image src="static/images/banner.png"/>
      </styles.Banner>
    );
  })
);

BannerTop.propTypes = {

};

export default BannerTop;
