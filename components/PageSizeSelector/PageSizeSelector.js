import React from "react";
import PropTypes from "prop-types";
import Select from "components/Select";
import { PAGE_SIZES } from "lib/utils/pageSizes";
import useTranslation from "hooks/useTranslation";

/**
 * Renders the page size selector
 *
 * @param {Integer} pageSize - the page size
 * @param {Function} onChange - the onChange page size handler
 * @returns {React.Component} The page size selector
 */
function PageSizeSelector({ pageSize, onChange }) {
  const { t } = useTranslation("common"); // eslint-disable-line id-length

  return (
    <Select
      value={pageSize}
      options={[
        {
          name: `20 ${t("products")}`,
          value: PAGE_SIZES._20
        },
        {
          name: `60 ${t("products")}`,
          value: PAGE_SIZES._60
        },
        {
          name: `100 ${t("products")}`,
          value: PAGE_SIZES._100
        }
      ]}
      inputProps={{
        name: "pageSize",
        id: "page-size"
      }}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

PageSizeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default PageSizeSelector;
