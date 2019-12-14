import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Hidden } from "@material-ui/core";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import Link from "components/Link";
import Drawer from "@material-ui/core/Drawer";
import * as s from "./style";

const CategoriesDrawer = inject(
  "uiStore",
  "tags"
)(
  observer(({ uiStore, tags }) => {
    const [currentImage, setCurrentImage] = useState("../../static/images/home/prod1.png");
    const [currentLink, setCurrentLink] = useState("example-tag");

    const handleClose = () => {
      uiStore.closeCategoriesDrawer();
    };

    const categoryHover = (slug) => {
      const path = "../../static/images/home/";
      if (slug === "example-tag") {
        setCurrentImage(`${path}prod1.png`);
      } else if (slug === "example") {
        setCurrentImage(`${path}prod2.png`);
      }

      setCurrentLink(slug);
    };

    return (
      <Hidden smDown>
        <Drawer
          anchor="top"
          open={uiStore.isCategoriesDrawerOpen}
          onClose={handleClose}
          ModalProps={{ style: { top: "95px" } }}
          BackdropProps={{ style: { position: "absolute" } }}
          PaperProps={{ style: { position: "absolute" } }}
          variant="temporary"
        >
          <s.Container>
            <s.Content>
              <s.Left>
                <s.Title>Categorias</s.Title>
                <s.Divider />
                {tags && tags.length ? (
                  <s.TagList>
                    {tags.map((tag) => (
                      <s.Tag onClick={handleClose} onMouseEnter={() => categoryHover(tag.slug)}>
                        <Link route={`/category/${tag.slug}`}>{tag.name}</Link>
                      </s.Tag>
                    ))}
                  </s.TagList>
                ) : (
                  <span> Nenhuma tag encontrada </span>
                )}
              </s.Left>
              <s.Right>
                <s.CategoryImage src={currentImage}>
                  <Link onClick={handleClose} route={`/category/${currentLink}`}>
                    Ver todos ►
                  </Link>
                </s.CategoryImage>
              </s.Right>
            </s.Content>
          </s.Container>
        </Drawer>
      </Hidden>
    );
  })
);

CategoriesDrawer.propTypes = {
  uiStore: PropTypes.shape({
    closeCategoriesDrawer: PropTypes.func
  }).isRequired
};

export default CategoriesDrawer;
