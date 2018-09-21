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

  handleNextClick = () => {
    const { pageInfo } = this.props;

    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    pageInfo.loadNextPage();
  }

  handlePreviousClick = () => {
    const { pageInfo } = this.props;

    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    pageInfo.loadPreviousPage();
  }

  render() {
    const { classes, pageInfo } = this.props;

    return (
      <Grid className={classes.root} container justify="space-between">
        <Grid item>
          {pageInfo.hasPreviousPage &&
            <Button onClick={this.handlePreviousClick}>Previous</Button>
          }
        </Grid>
        <Grid item>
          {pageInfo.hasNextPage &&
            <Button onClick={this.handleNextClick}>Next</Button>
          }
        </Grid>
      </Grid>
    );
  }
}
