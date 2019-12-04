import React from "react";
import { Hidden } from "@material-ui/core";
import * as s from "./style";

const CategoriesBlock = () => {
  return (
    <s.Section>
      <s.Title>Lorem Ipsum</s.Title>
      <Hidden mdUp>
        <s.TwoImagesLine>
          <s.Image>
            <s.CategoryName>Jewelry</s.CategoryName>
          </s.Image>
          <s.Image>
            <s.CategoryName>Tops</s.CategoryName>
          </s.Image>
        </s.TwoImagesLine>

        <s.OneImageLine>
          <s.Image oneLine>
            <s.CategoryName>Dress</s.CategoryName>
          </s.Image>
        </s.OneImageLine>

        <s.TwoImagesLine>
          <s.Image>
            <s.CategoryName>Fitness</s.CategoryName>
          </s.Image>
          <s.Image>
            <s.CategoryName>Handbags</s.CategoryName>
          </s.Image>
        </s.TwoImagesLine>
      </Hidden>

      <Hidden smDown>
        <s.TwoImagesDesktop>
          <s.Image twoImages>
            <s.CategoryName>Dress</s.CategoryName>
          </s.Image>
          <s.Image twoImages>
            <s.CategoryName>Handbags</s.CategoryName>
          </s.Image>
        </s.TwoImagesDesktop>
        <s.ThreeImagesDesktop>
          <s.Image>
            <s.CategoryName>Jewelry</s.CategoryName>
          </s.Image>
          <s.Image>
            <s.CategoryName>Tops</s.CategoryName>
          </s.Image>
          <s.Image>
            <s.CategoryName>Fitness</s.CategoryName>
          </s.Image>
        </s.ThreeImagesDesktop>
      </Hidden>
    </s.Section>
  );
};

export default CategoriesBlock;
