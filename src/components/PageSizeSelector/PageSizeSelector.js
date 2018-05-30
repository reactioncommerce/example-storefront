import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "components/Select";

const PAGE_SIZES = [
  {
    name: "20 Products",
    value: 20
  },
  {
    name: "60 Products",
    value: 60
  },
  {
    name: "100 Products",
    value: 100
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
        options={PAGE_SIZES}
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
