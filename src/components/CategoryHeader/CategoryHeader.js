import React from "react";
import PropTypes from "prop-types";
import * as s from "./style";

const CategoryHeader = (props) => {
  const { page, totalPages } = props;
  return (
    <div>
      <s.CategoryHeader>
        <s.TotalVisible>Itens <s.Visible>{ page.order.visible }</s.Visible> de { totalPages} </s.TotalVisible>
        <s.Title>{ page.name } </s.Title>
      </s.CategoryHeader>
      <s.CategoryFilters>
        <s.FilterItem>Marcas</s.FilterItem>
        <s.FilterItem>Preço</s.FilterItem>
        <s.FilterItem>Marcas</s.FilterItem>
      </s.CategoryFilters>
    </div>
  );
};

CategoryHeader.propTypes = {
  page: PropTypes.object
};

export default CategoryHeader;
