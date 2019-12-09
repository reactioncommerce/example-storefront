import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import * as s from "./style";

const ResultsHeader = (props) => {
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
              <MenuItem value="Maior">Maior</MenuItem>
              <MenuItem value="Menor">Menor</MenuItem>
            </s.StyledSelect>
          </s.StyledFormControl>

        </s.FilterItem>
      </s.CategoryFilters>
    </div>
  );
};

ResultsHeader.propTypes = {
  page: PropTypes.object
};

export default ResultsHeader;
