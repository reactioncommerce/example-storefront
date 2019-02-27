import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  gridTitle: {
    color: theme.palette.reaction.coolGrey500,
    fontWeight: theme.typography.fontWeightMedium,
    margin: "30px 0",
    textAlign: "center"
  }
});

@withStyles(styles, { name: "SkProductGridTitle" })
export default class ProductGridTitle extends Component {
  static propTypes = {
    classes: PropTypes.object,
    displayTitle: PropTypes.string
  };

  static defaultProps = {
    classes: {},
    displayTitle: ""
  };

  render() {
    const { classes, displayTitle } = this.props;

    if (!displayTitle) return null;

    return (
      <Typography className={classes.gridTitle} component="h1" variant="h6">{displayTitle}</Typography>
    );
  }
}
