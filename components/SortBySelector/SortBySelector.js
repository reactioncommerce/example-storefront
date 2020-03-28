import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "components/Select";

const SORT_BY = [
  {
    name: "Newest",
    value: "updatedAt-desc"
  },
  {
    name: "Price: low to high",
    value: "minPrice-asc"
  },
  {
    name: "Price: high to low",
    value: "minPrice-desc"
  }
];

class SortBySelector extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const { sortBy } = this.props;

    return (
      <Select
        value={sortBy}
        options={SORT_BY}
        inputProps={{
          name: "sortBy",
          id: "sort-by"
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default SortBySelector;
