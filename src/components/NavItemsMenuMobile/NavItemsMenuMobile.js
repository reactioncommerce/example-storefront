import React from "react";
import PropTypes from "prop-types";
import MenuRightIcon from "mdi-material-ui/MenuRight";
import MenuLeftIcon from "mdi-material-ui/MenuLeft";
import Link from "components/Link";
import * as s from "./style";

const NavItemsMenuMobile = ({ handleClose }) => {
  const navItems = [
    { title: "Link", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" }
  ];

  return (
    <s.Navigation>
      <s.BackButton id="close-menu" onClick={handleClose}>
        <MenuLeftIcon />
        <s.BackButtonText>VOLTAR</s.BackButtonText>
      </s.BackButton>

      {navItems &&
        navItems.map((el, idx) => (
          <s.LinkContainer key={idx}>
            <Link id={`page-link-${idx}`} route="/" onClick={handleClose}>
              Link
              <MenuRightIcon />
            </Link>
          </s.LinkContainer>
        ))}
    </s.Navigation>
  );
};

NavItemsMenuMobile.propTypes = {
  handleClose: PropTypes.func
};

export default NavItemsMenuMobile;
