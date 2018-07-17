import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

@observer
class Checkout extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
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
          <div>Placeholder for CheckoutTopHat component</div>
          <div>Placeholder for CheckoutNav component</div>
          <Grid container spacing={24}>
            <Grid item xs={12} md={8}>
              <Typography>
                Checkout Action components Placeholder
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography>
                Checkout Cart Review placeholder
              </Typography>
            </Grid>
          </Grid>
        </section>
      </Fragment>
    );
  }
}

export default Checkout;
