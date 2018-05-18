import React, { Component } from 'react'
import { withStyles } from "material-ui/styles";
import Select from "material-ui/Select";
import MenuItem from 'material-ui/Menu/MenuItem';
import keyMirror from "keymirror";

const PAGE_SIZES = keyMirror({
  20: null,
  60: null,
  100: null
});

const styles = theme => ({
  root: {
    display: "flex"
  }
});

@withStyles(styles)
class PageSizeSelector extends Component {
  state = {
    pageSize: PAGE_SIZES[20]
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  renderOptions() {
    return (
      Object.keys(PAGE_SIZES).map(key => (
        <MenuItem key={key} value={key}>{`${key} Products`}</MenuItem>
      ))
    )
  }

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>  
        <Select
          value={this.state.pageSize}
          onChange={this.handleChange}
          inputProps={{
            name: "pageSize",
            id: "page-size"
          }}
        >
          {this.renderOptions()}
        </Select>
      </div>
    )
  }
}

export default PageSizeSelector;
