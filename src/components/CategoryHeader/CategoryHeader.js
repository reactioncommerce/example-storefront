import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import * as s from "./style";

const CategoryHeader = (props) => {
  const { page, totalPages } = props;
  return (
    <div>
      <s.CategoryHeader>
        <s.TotalVisible>Itens <s.Visible>{ page.pagination.visible }</s.Visible> de { totalPages} </s.TotalVisible>
        <s.Title>{ page.name } </s.Title>
      </s.CategoryHeader>
      <s.CategoryFilters>

        <s.FilterItem>
          Ordernar por preço:
          <s.StyledFormControl>
            <s.StyledInputLabel htmlFor="reason">Selecionar</s.StyledInputLabel>
            <s.StyledSelect id="reason">
              <MenuItem value="Produto">Maior</MenuItem>
              <MenuItem value="Reclamação">Menor</MenuItem>
            </s.StyledSelect>
          </s.StyledFormControl>
          {/* <s.Label htmlFor="dropdown">
            Filtrar por preço:
          </s.Label>
          <s.Input id="dropdown" type="checkbox" hidden />
          <s.Dropdown>
            <s.DropdownItem>Menor preço</s.DropdownItem>
            <s.DropdownItem>Maior preço</s.DropdownItem>
          </s.Dropdown> */}
        </s.FilterItem>
      </s.CategoryFilters>
    </div>
  );
};

CategoryHeader.propTypes = {
  page: PropTypes.object
};

export default CategoryHeader;
