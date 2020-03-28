import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default class Profile extends Component {
  static propTypes = {
    viewer: PropTypes.object
  };

  static defaultProps = {
    viewer: {}
  };

  render() {
    const { viewer } = this.props;

    if (viewer) {
      return <Typography variant="subtitle1">Hello {viewer.name}</Typography>;
    }

    return null;
  }
}
