import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Helmet from "react-helmet";

// PDP Components
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailInfo from "components/ProductDetailInfo";
import MediaGallery from "components/MediaGallery";
import TagGrid from "components/TagGrid"

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  pdpContainer: {
    maxWidth: 1440
  },
  section: {
    marginBottom: theme.spacing.unit * 2
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
          <Grid item xs={12} sm={6}>
            <div className={classes.section}>
              <MediaGallery mediaItems={catalogProduct.media} />
            </div>
            <div className={classes.section}>
              <TagGrid tags={catalogProduct.tags} />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetail;
