import React, { useState } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import SearchField from "components/SearchField";
import NavItemsMenuMobile from "components/NavItemsMenuMobile";
import Slide from "@material-ui/core/Slide";
import { Hidden } from "@material-ui/core";
import Link from "components/Link";
import UserIcon from "../Icons/User";
import InfoIcon from "../Icons/Info";
import { CategoriesMobile } from "../CategoriesMobile";
import * as styles from "./style";

const NavigationMobile = inject("uiStore")(
  observer(({ uiStore }) => {
    const [showCategories, setShowCategories] = useState(false);
    const handleClose = () => {
      uiStore.closeMenuDrawer();
      setShowCategories(false);
    };

    return (
      <Hidden mdUp>
        <Drawer
          open={uiStore.isMenuDrawerOpen}
          onClose={handleClose}
          BackdropProps={{ style: { position: "absolute" } }}
          PaperProps={{ style: { top: "23px", position: "absolute", overflowX: "hidden" } }}
          variant="temporary"
        >
          <styles.Container>
            <styles.Header>
              <SearchField />
            </styles.Header>
            <Divider style={{ backgroundColor: "#9c27b1" }} />
            <NavItemsMenuMobile handleClose={handleClose} showCategories={() => setShowCategories(true)} />
            <Divider style={{ marginTop: "30px" }} />

            <styles.Footer>
              <styles.LinkContainer>
                <Link route="/" onClick={handleClose}>
                  <UserIcon />
                  Minha conta
                </Link>
              </styles.LinkContainer>

              <styles.LinkContainer>
                <Link route="/" onClick={handleClose}>
                  <InfoIcon />
                  Ajuda
                </Link>
              </styles.LinkContainer>
            </styles.Footer>
          </styles.Container>
          <Slide direction="left" in={showCategories}>
            <CategoriesMobile handleCloseDrawer={handleClose} handleCloseSlider={() => setShowCategories(false)} />
          </Slide>
        </Drawer>
      </Hidden>
    );
  })
);

NavigationMobile.propTypes = {
  uiStore: PropTypes.shape({
    closeMenuDrawer: PropTypes.func
  }).isRequired
};

export default NavigationMobile;
