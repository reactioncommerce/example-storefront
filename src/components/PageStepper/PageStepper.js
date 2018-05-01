import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import withStyles from "material-ui/styles/withStyles";

const styles = (theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

@withStyles(styles, { withTheme: true })
export default class ProductGrid extends Component {
  static propTypes = {
    classes: PropTypes.object,
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    }),
    theme: PropTypes.object
  };

  render() {
    const { classes, pageInfo, theme } = this.props;

    return (
      <Grid className={classes.root} container justify="center" spacing={theme.spacing.unit * 2}>
        {pageInfo.hasPreviousPage &&
          <Grid item>
            <Button onClick={pageInfo.loadPreviousPage} variant="raised">Previous</Button>
          </Grid>
        }
        {pageInfo.hasNextPage &&
          <Grid item>
            <Button onClick={pageInfo.loadNextPage} variant="raised">
              Next
            </Button>
          </Grid>
        }
      </Grid>
    );
  }
}
