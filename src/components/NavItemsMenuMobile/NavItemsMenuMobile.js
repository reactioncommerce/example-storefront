import React from "react";
import PropTypes from "prop-types";
import MenuRightIcon from "mdi-material-ui/MenuRight";
import MenuLeftIcon from "mdi-material-ui/MenuLeft";
import Link from "components/Link";
import * as styles from "./style";

const NavItemsMenuMobile = ({ handleClose }) => {
  const navItems = [
    { title: "Link", href: "/" },
    { title: "Categorias", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" }
  ];

  return (
    <styles.Navigation>
      <styles.BackButton id="close-menu" onClick={handleClose}>
        <MenuLeftIcon />
        <styles.BackButtonText>VOLTAR</styles.BackButtonText>
      </styles.BackButton>

      {navItems &&
        navItems.map((el, idx) => (
          <styles.LinkContainer key={idx}>
            <Link id={`page-link-${idx}`} route="/" onClick={handleClose}>
              Link
              <MenuRightIcon />
            </Link>
          </styles.LinkContainer>
        ))}
    </styles.Navigation>
  );
};

NavItemsMenuMobile.propTypes = {
  handleClose: PropTypes.func
};

export default NavItemsMenuMobile;
