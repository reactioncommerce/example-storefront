import React, { useState } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import SearchField from "components/SearchField";
import NavItemsMenuMobile from "components/NavItemsMenuMobile";
import Slide from "@material-ui/core/Slide";
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
    };

    return (
      <Drawer
        open={uiStore.isMenuDrawerOpen}
        onClose={handleClose}
        BackdropProps={{ style: { position: "absolute" } }}
        PaperProps={{ style: { top: "23px", position: "absolute" } }}
        variant="temporary"
      >
        <styles.Container>
          <styles.Header>
            <SearchField />
          </styles.Header>
          <Divider style={{ backgroundColor: "#9c27b1" }} />
          <NavItemsMenuMobile handleClose={handleClose} onCategoriesClick={() => setShowCategories(true)} />
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
            <div onClick={() => setShowCategories(!showCategories)}>tete</div>
          </styles.Footer>
        </styles.Container>
        <Slide direction="left" in={showCategories}>
          <CategoriesMobile handleClose={() => setShowCategories(false)} />
        </Slide>
      </Drawer>
    );
  })
);

NavigationMobile.propTypes = {
  uiStore: PropTypes.shape({
    closeMenuDrawer: PropTypes.func
  }).isRequired
};

export default NavigationMobile;
