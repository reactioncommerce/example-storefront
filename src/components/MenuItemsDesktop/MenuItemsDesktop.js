import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "components/Link";
import * as s from "./style";

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
    <s.Items>
      {links &&
        links.length &&
        links.map((link, idx) => {
          return (
            <Link key={idx} route={link.url}>
              {link.title}
            </Link>
          );
        })}
    </s.Items>
  );
};

export default MenuItemsDesktop;
