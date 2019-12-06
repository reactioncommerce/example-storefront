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
  observer(({ uiStore, tags, handleClose }) => {
    const [currentImage, setCurrentImage] = useState("../../static/images/home/prod1.png");
    const [currentLink, setCurrentLink] = useState("example-tag");

    const categoryHover = (slug) => {
      const path = "../../static/images/home/";
      if (slug === "example-tag") {
        setCurrentImage(`${path}prod1.png`);
      } else if (slug === "example") {
        setCurrentImage(`${path}prod2.png`);
      }

      setCurrentLink(slug);
    };

    return <s.Container onClick={handleClose}>Alright</s.Container>;
  })
);

CategoriesDrawer.propTypes = {
  uiStore: PropTypes.shape({
    closeCategoriesDrawer: PropTypes.func
  }).isRequired
};

export default CategoriesDrawer;
