import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@reactioncommerce/components/Button/v1";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

@withStyles(styles, { name: "SkPageStepper" })
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
            <Button onClick={pageInfo.loadPreviousPage}>Previous</Button>
          }
        </Grid>
        <Grid item>
          {pageInfo.hasNextPage &&
            <Button onClick={pageInfo.loadNextPage}>Next</Button>
          }
        </Grid>
      </Grid>
    );
  }
}
