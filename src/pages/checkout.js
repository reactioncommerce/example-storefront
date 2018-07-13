import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
  }
};

@inject("uiStore")
@observer
@withStyles(styles)
class Checkout extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    uiStore: PropTypes.object
  };

  render() {
    const { shop } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Checkout</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <section>
          <Grid container spacing={24}>
            <Grid item xs={12} md={8}>
              <Typography>
                Checkout Actions
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography>
                Checkout Cart Review
              </Typography>
            </Grid>
          </Grid>
        </section>
      </Fragment>
    );
  }
}

export default Checkout;
