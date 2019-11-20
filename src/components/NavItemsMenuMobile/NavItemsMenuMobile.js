import React from "react";
import MenuRightIcon from "mdi-material-ui/MenuRight";
import MenuLeftIcon from "mdi-material-ui/MenuLeft";
import Link from "components/Link";
import * as styles from "./style";

const NavItemsMenuMobile = ({ handleClose }) => {
  const navItems = [
    { title: "Link", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" },
    { title: "Link", href: "/" }
  ];

  return (
    <styles.Navigation>
      <styles.BackButton onClick={handleClose}>
        <MenuLeftIcon />
        <styles.BackButtonText>VOLTAR</styles.BackButtonText>
      </styles.BackButton>

      {navItems &&
        navItems.map((el, idx) => (
          <styles.LinkContainer key={idx}>
            <Link route="/" onClick={handleClose}>
              Link
              <MenuRightIcon />
            </Link>
          </styles.LinkContainer>
        ))}
    </styles.Navigation>
  );
};

export default NavItemsMenuMobile;
