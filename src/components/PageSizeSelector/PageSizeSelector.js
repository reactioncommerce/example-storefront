import React, { Component } from 'react'
import Select from "components/Select";
import MenuItem from 'material-ui/Menu/MenuItem';

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
  state = {
    pageSize: PAGE_SIZES[0].value
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <Select
        value={this.state.pageSize}
        options={PAGE_SIZES}
        inputProps={{
          name: "pageSize",
          id:   "page-size"
        }}
        onChange={this.handleChange}
      />
    )
  }
}

export default PageSizeSelector;
