import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import IconButton from "material-ui/IconButton";
import MenuIcon from "mdi-material-ui/Menu";

@inject("uiStore")
@observer
class NavigationToggleMobile extends Component {
  static propTypes = {
    uiStore: PropTypes.object
  };

  static defaultProps = {
    uiStore: {}
  };

  render() {
    const { uiStore } = this.props;
    return (
      <IconButton color="inherit" onClick={uiStore.toggleMenuDrawerOpen}>
        <MenuIcon />
      </IconButton>
    );
  }
}

export default NavigationToggleMobile;
