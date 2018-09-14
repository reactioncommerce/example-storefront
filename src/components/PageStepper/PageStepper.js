import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => theme.PageStepper;

@withStyles(styles)
export default class PageStepper extends Component {
  static propTypes = {
    classes: PropTypes.object,
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    }).isRequired,
    theme: PropTypes.object
  };

  render() {
    const { classes, pageInfo } = this.props;

    return (
      <Grid className={classes.root} container justify="space-between">
        <Grid item>
          {pageInfo.hasPreviousPage &&
            <Button onClick={pageInfo.loadPreviousPage} variant="raised">{"Previous"}</Button>
          }
        </Grid>
        <Grid item>
          {pageInfo.hasNextPage &&
            <Button onClick={pageInfo.loadNextPage} variant="raised">{"Next"}</Button>
          }
        </Grid>
      </Grid>
    );
  }
}
