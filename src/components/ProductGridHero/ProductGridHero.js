import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import styles from "./styles";


@withStyles(styles)
export default class ProductGridHero extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.productGridContainer}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <img alt="Tag Hero" className={classes.heroImg} src="https://k-lerlandworks.com/wp-content/uploads/2017/11/Custom-Water-Features-1600x325.jpg" />
          </Grid>
        </Grid>
      </section>
    );
  }
}
