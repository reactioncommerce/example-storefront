import React, { useEffect } from "react";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import Link from "components/Link";
import * as s from "./style";

const MenuItemsDesktop = inject("uiStore")(
  observer(({ uiStore }) => {
    useEffect(() => {}, []);

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
      uiStore.toggleCategoriesDrawerOpen();
    };

    const verifyClickFunction = (e, title) => {
      if (title === "Categorias") {
        return onCategoriesClick(e);
      }
      return null;
    };

    return (
      <s.Items>
        {links &&
          links.length &&
          links.map((link, idx) => {
            return (
              <Link key={idx} route={link.url} onClick={(e) => verifyClickFunction(e, link.title)}>
                {link.title}
              </Link>
            );
          })}
      </s.Items>
    );
  })
);

export default MenuItemsDesktop;
