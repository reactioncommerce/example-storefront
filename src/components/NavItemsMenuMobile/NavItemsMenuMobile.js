import React from "react";
import PropTypes from "prop-types";
import MenuRightIcon from "mdi-material-ui/MenuRight";
import MenuLeftIcon from "mdi-material-ui/MenuLeft";
import Link from "components/Link";
import * as s from "./style";

const NavItemsMenuMobile = ({ handleClose, showCategories }) => {
  const links = [
    {
      url: "/",
      title: "Link"
    },
    {
      url: "/",
      title: "Categorias"
    },
    {
      url: "/",
      title: "Link"
    },
    {
      url: "/",
      title: "Link"
    },
    {
      url: "/",
      title: "Link"
    }
  ];

  const onCategoriesClick = (e) => {
    e.preventDefault();
    showCategories();
  };

  const verifyClickFunction = (e, title) => {
    if (title === "Categorias") {
      return onCategoriesClick(e);
    }

    handleClose();
    return null;
  };

  return (
    <s.Navigation>
      <s.BackButton id="close-menu" onClick={handleClose}>
        <MenuLeftIcon />
        <s.BackButtonText>VOLTAR</s.BackButtonText>
      </s.BackButton>

      {links &&
        links.map((link, idx) => (
          <s.LinkContainer key={idx}>
            <Link route="/" onClick={(e) => verifyClickFunction(e, link.title)}>
              {link.title}
              <MenuRightIcon />
            </Link>
          </s.LinkContainer>
        ))}
    </s.Navigation>
  );
};

NavItemsMenuMobile.propTypes = {
  handleClose: PropTypes.func,
  showCategories: PropTypes.func
};

export default NavItemsMenuMobile;
