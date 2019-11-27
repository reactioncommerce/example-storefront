import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Hidden from "@material-ui/core/Hidden";
import { NavigationMobile } from "components/NavigationMobile";
import MiniCart from "components/MiniCart";
import HamburgerIcon from "../Icons/HamburgerMenu";
import MenuItemsDesktop from "../MenuItemsDesktop/MenuItemsDesktop";
import * as styles from "./style";


const banner_url = 'static/images/banner.png';

const About = inject("uiStore")(
  observer(({ uiStore }) => {
    return (
        <div>
          <h1>about section</h1>
        </div>
    );
  })
);

About.propTypes = {

};

export default About;
