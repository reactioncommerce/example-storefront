import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

// PDP Components
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  pdpContainer: {
    maxWidth: 1920
  }
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
@withStyles(styles, { withTheme: true })
class ProductDetail extends Component {
  static propTypes = {
    catalogProduct: PropTypes.object,
    classes: PropTypes.object,
    theme: PropTypes.object
  }

  render() {
    const { classes, theme, catalogProduct } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.pdpContainer} spacing={theme.spacing.unit * 3}>
          <Grid item sm={6}>
            {/* TODO: Left Content, remove when adding initial components */}
            <Typography variant="display1">Left Container</Typography>
          </Grid>

          <Grid item sm={6}>
            <ProductDetailTitle
              pageTitle={catalogProduct.pageTitle}
              title={catalogProduct.title}
            />
            <VariantList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetail;
