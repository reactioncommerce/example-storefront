import React, { Component } from "react";
import PropTypes from "prop-types";
import MuiSelect from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";

class Select extends Component {
  static propTypes = {
    inputProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.number
  }

  renderOptions() {
    const { options } = this.props;

    return (
      options.map((option) => (
        <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
      ))
    );
  }

  handleChange = (event) => {
    this.props.onChange(event);
  }

  render() {
    const { value, inputProps } = this.props;

    return (
      <MuiSelect
        value={value}
        onChange={this.handleChange}
        inputProps={{ ...inputProps }}
      >
        {this.renderOptions()}
      </MuiSelect>
    );
  }
}

export default Select;
