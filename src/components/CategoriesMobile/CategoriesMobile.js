import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import MenuLeftIcon from "mdi-material-ui/MenuLeft";
import Link from "components/Link";
import { categories } from "../../helpers/constants";
import * as s from "./style";

const CategoriesDrawer = inject("tags")(
  observer(({ tags, handleCloseDrawer, handleCloseSlider }) => {
    const getCategoryImage = (slug) => {
      const category = categories.find((cat) => cat.slug === slug);
      return category && category.image;
    };

    const getCategoryLink = (slug) => {
      return `/tag/${slug}`;
    };

    return (
      <s.Navigation>
        <s.BackButton id="back-slider" onClick={handleCloseSlider}>
          <MenuLeftIcon />
          <s.BackButtonText>VOLTAR</s.BackButtonText>
        </s.BackButton>
        {tags && tags.length ? (
          tags.map((tag) => {
            return (
              <Link onClick={handleCloseDrawer} route={getCategoryLink(tag.slug)}>
                <s.CategoryBlock className="category-block">
                  <s.CategoryName>{tag.name}</s.CategoryName>
                  <s.CategoryImage src={getCategoryImage(tag.slug)}>
                    <s.ShowAll>Ver todos ►</s.ShowAll>
                  </s.CategoryImage>
                </s.CategoryBlock>
              </Link>
            );
          })
        ) : (
          <span>nenhuma categoria encontrada</span>
        )}
      </s.Navigation>
    );
  })
);

CategoriesDrawer.propTypes = {
  handleCloseDrawer: PropTypes.func,
  handleCloseSlider: PropTypes.func
};

export default CategoriesDrawer;
