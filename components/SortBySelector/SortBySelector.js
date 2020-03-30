import React from "react";
import PropTypes from "prop-types";
import Select from "components/Select";
import useTranslation from "hooks/useTranslation";

function SortBySelector({ sortBy, onChange }) {
  const { t } = useTranslation("common");

  return (
    <Select
      value={sortBy}
      options={[
        {
          name: t("updatedAtDesc"),
          value: "updatedAt-desc"
        },
        {
          name: t("minPriceAsc"),
          value: "minPrice-asc"
        },
        {
          name: t("minPriceDesc"),
          value: "minPrice-desc"
        }
      ]}
      inputProps={{
        name: "sortBy",
        id: "sort-by"
      }}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

SortBySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};

export default SortBySelector;
