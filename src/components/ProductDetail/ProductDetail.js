import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Helmet from "react-helmet";

// PDP Components
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailInfo from "components/ProductDetailInfo";
import OptionsList from "components/OptionsList";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  pdpContainer: {
    maxWidth: 1920
  },
  panel: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto"
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
    // Fiter out variant options
    const variants = catalogProduct.variants.filter((variant) => variant.ancestorIds.length === 1);

    return (
      <div className={classes.root}>
        <Helmet>
          <title>{catalogProduct.title}</title>
          <meta name="description" content={catalogProduct.description} />
        </Helmet>
        <Grid container className={classes.pdpContainer} spacing={theme.spacing.unit * 3}>
          <Grid className={classes.panel} item sm={6}>
            {/* TODO: Left Content, remove when adding initial components */}
            <Typography variant="display1">Left Container</Typography>
          </Grid>

          <Grid className={classes.panel} item sm={6}>
            <ProductDetailTitle
              pageTitle={catalogProduct.pageTitle}
              title={catalogProduct.title}
            />
            <ProductDetailInfo
              priceRange={catalogProduct.price.range}
              description={catalogProduct.description}
              vendor={catalogProduct.vendor}
            />
            <VariantList product={catalogProduct} variants={variants}/>
            <OptionsList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetail;
