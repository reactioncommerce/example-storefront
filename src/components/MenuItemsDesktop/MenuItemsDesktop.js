import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "components/Link";
import * as styles from "./style";

const MenuItemsDesktop = () => {
  useEffect(() => {}, []);

  const links = [
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
  return (
    <styles.Items>
      {links &&
        links.length &&
        links.map((link, idx) => {
          return (
            <Link key={idx} route={link.url}>
              {link.title}
            </Link>
          );
        })}
    </styles.Items>
  );
};

MenuItemsDesktop.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};

MenuItemsDesktop.defaultProps = {
  color: "#333",
  size: "30px"
};

export default MenuItemsDesktop;
