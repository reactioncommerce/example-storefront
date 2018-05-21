import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import IconButton from "material-ui/IconButton";
import MenuIcon from "mdi-material-ui/Menu";

@inject("uiStore")
class NavigationToggleMobile extends Component {
  static propTypes = {
    uiStore: PropTypes.object.isRequired
  };

  handleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };

  render() {
    return (
      <IconButton color="inherit" onClick={this.handleClick}>
        <MenuIcon />
      </IconButton>
    );
  }
}

export default NavigationToggleMobile;
