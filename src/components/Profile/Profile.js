import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";

export default class Profile extends Component {
  static propTypes = {
    viewer: PropTypes.object
  };

  static defaultProps = {
    viewer: {}
  };

  render() {
    const { viewer: { name } } = this.props;
    return <Typography variant="subheading">Hello {name}</Typography>;
  }
}
