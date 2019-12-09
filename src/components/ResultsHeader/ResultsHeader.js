import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import * as s from "./style";

const ResultsHeader = ({ itemsOnScreen, totalItems, pageName }) => {
  return (
    <div>
      <s.CategoryHeader>
        <s.TotalVisible>
          Itens <s.Visible>{itemsOnScreen}</s.Visible> de {totalItems}{" "}
        </s.TotalVisible>
        <s.Title>{pageName} </s.Title>
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
  itemsOnScreen: PropTypes.number,
  pageName: PropTypes.string,
  totalItems: PropTypes.number
};

export default ResultsHeader;
