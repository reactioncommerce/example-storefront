import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "components/Select";

const SORT_BY = [
  {
    name: "Newest",
    value: "newest"
  },
  {
    name: "Price: low to high",
    value: "price-low-high"
  },
  {
    name: "Price: high to low",
    value: "price-high-low"
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
