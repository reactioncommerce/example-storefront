import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiSelect from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => theme.Select;

@withStyles(styles)
class Select extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    inputProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  renderOptions() {
    const { classes, options } = this.props;

    return (
      options.map((option) => (
        <MenuItem
          classes={{
            selected: classes.selected
          }}
          className={classes.menuItem}
          key={option.value}
          value={option.value}
        >
          {option.name}
        </MenuItem>
      ))
    );
  }

  handleChange = (event) => {
    this.props.onChange(event);
  }

  render() {
    const { classes, inputProps, value } = this.props;

    return (
      <MuiSelect
        classes={{
          selectMenu: classes.selectMenu
        }}
        input={<Input className={classes.input} disableUnderline />}
        inputProps={{ ...inputProps }}
        MenuProps={{
          PopoverClasses: {
            paper: classes.popOver
          }
        }}
        onChange={this.handleChange}
        value={value}
      >
        {this.renderOptions()}
      </MuiSelect>
    );
  }
}

export default Select;
