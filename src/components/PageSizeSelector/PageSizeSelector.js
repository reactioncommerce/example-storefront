import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "components/Select";
import { observer } from "mobx-react";

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

@observer
class PageSizeSelector extends Component {
  static propTypes = {
    uiStore: PropTypes.object.isRequired
  }

  handleChange = (event) => {
    this.props.uiStore.setPageSize(event.target.value);
  }

  render() {
    const { uiStore } = this.props;

    return (
      <Select
        value={uiStore.pageSize}
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
