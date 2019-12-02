import React from "react";
import * as styles from "./style";

const CategoriesBlock = () => {
  return (
    <styles.Section>
      <styles.Title>Lorem Ipsum</styles.Title>

      <styles.TwoImagesLine>
        <styles.Image>
          <styles.CategoryName>Jewelry</styles.CategoryName>
        </styles.Image>
        <styles.Image>
          <styles.CategoryName>Tops</styles.CategoryName>
        </styles.Image>
      </styles.TwoImagesLine>

      <styles.OneImageLine>
        <styles.Image oneLine>
          <styles.CategoryName>Dress</styles.CategoryName>
        </styles.Image>
      </styles.OneImageLine>

      <styles.TwoImagesLine>
        <styles.Image>
          <styles.CategoryName>Fitness</styles.CategoryName>
        </styles.Image>
        <styles.Image>
          <styles.CategoryName>Handbags</styles.CategoryName>
        </styles.Image>
      </styles.TwoImagesLine>
    </styles.Section>
  );
};

export default CategoriesBlock;
