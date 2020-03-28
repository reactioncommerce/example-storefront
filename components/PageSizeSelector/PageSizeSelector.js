import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "components/Select";
import { PAGE_SIZES } from "lib/utils/pageSizes";

const SELECTOR_OPTIONS = [
  {
    name: "20 Products",
    value: PAGE_SIZES._20
  },
  {
    name: "60 Products",
    value: PAGE_SIZES._60
  },
  {
    name: "100 Products",
    value: PAGE_SIZES._100
  }
];

class PageSizeSelector extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const { pageSize } = this.props;

    return (
      <Select
        value={pageSize}
        options={SELECTOR_OPTIONS}
        inputProps={{
          name: "pageSize",
          id: "page-size"
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default PageSizeSelector;
