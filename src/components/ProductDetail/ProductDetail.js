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
import TagGrid from "components/TagGrid";

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  pdpContainer: {
    maxWidth: 1400
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
    classes: PropTypes.object,
    product: PropTypes.object,
    theme: PropTypes.object
  }

  render() {
    const { classes, theme, product } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>{product.title}</title>
          <meta name="description" content={product.description} />
        </Helmet>
        <Grid container className={classes.pdpContainer} spacing={theme.spacing.unit * 3}>
          <Grid item xs={12} sm={6}>
            <div className={classes.section}>
              <MediaGallery mediaItems={product.media} />
            </div>
            <div className={classes.section}>
              <TagGrid tags={product.tags.nodes} />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProductDetailTitle
              pageTitle={product.pageTitle}
              title={product.title}
            />
            <ProductDetailInfo
              priceRange={product.price.range}
              description={product.description}
              vendor={product.vendor}
            />
            <VariantList product={product} variants={product.variants}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetail;
