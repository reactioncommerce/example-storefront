import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Img from "components/Img";

const styles = (theme) => ({
  heroImg: {
    width: "100%",
    height: "325px",
    objectFit: "cover"
  },
  heroGridContainer: {
    maxWidth: theme.grid.productGridMaxWidth,
    margin: "40px auto"
  }
});

@withStyles(styles)
export default class ProductGridHero extends Component {
  static propTypes = {
    classes: PropTypes.object,
    tag: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    tag: {}
  };

  renderHeroImage() {
    const { tag: { heroMediaUrl } } = this.props;

    if (!heroMediaUrl) {
      return null;
    }

    return <Img isHero src={heroMediaUrl} />;
  }

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.heroGridContainer}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {this.renderHeroImage()}
          </Grid>
        </Grid>
      </section>
    );
  }
}
