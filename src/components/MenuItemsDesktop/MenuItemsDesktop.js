import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "components/Link";
import * as styles from "./style";

const MenuItemsDesktop = () => {
  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <styles.Items>
      <Link route="/">Link</Link>
      <Link route="/">Link</Link>
      <Link route="/">Link</Link>
      <Link route="/">Link</Link>
    </styles.Items>
  );
};

MenuItemsDesktop.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

MenuItemsDesktop.defaultProps = {
  size: "30px",
  color: "#333"
};

export default MenuItemsDesktop;
