import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
    tag: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    tag: {}
  };

  render() {
    const { classes, tag: { displayTitle } } = this.props;

    if (!displayTitle) return null;

    return (
      <section className={classes.titleContainer}>
        <Grid item xs={12}>
          <Typography className={classes.gridTitle} component="h1" variant="title">{displayTitle}</Typography>
        </Grid>
      </section>
    );
  }
}
