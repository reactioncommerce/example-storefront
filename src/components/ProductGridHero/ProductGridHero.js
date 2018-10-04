import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProgressiveImage from "@reactioncommerce/components/ProgressiveImage/v1";

const styles = (theme) => ({
  heroContainer: {
    paddingTop: "30%"
  },
  heroGridContainer: {
    maxWidth: theme.layout.mainContentMaxWidth,
    margin: "20px auto"
  }
});

@withStyles(styles, { name: "SkProductGridHero" })
export default class ProductGridHero extends Component {
  static propTypes = {
    classes: PropTypes.object,
    tag: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    tag: {}
  };

  render() {
    const { classes, tag: { heroMediaUrl } } = this.props;

    if (!heroMediaUrl) return null;

    return (
      <section className={classes.heroGridContainer}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ProgressiveImage src={heroMediaUrl} className={classes.heroContainer} />
          </Grid>
        </Grid>
      </section>
    );
  }
}
