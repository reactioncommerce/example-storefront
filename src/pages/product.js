import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import withCart from "containers/cart/withCart";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import ProductDetail from "components/ProductDetail";
import Breadcrumb from "components/Breadcrumb";
import Grid from "@material-ui/core/Grid";
import PageLoading from "components/PageLoading";
import ErrorPage from "./_error";
import product from "./PRODUCT_MOCK.json";

@withCart
@withCatalogItemProduct
class ProductDetailPage extends Component {
  static propTypes = {
    /**
     * Function to add items to a cart, usually using the addItemsToCart from @withCart decorator.
     *
     * @example addItemsToCart(CartItemInput)
     * @type function
     */
    addItemsToCart: PropTypes.func,
    isLoadingProduct: PropTypes.bool,
    /**
     * Catalog Product item
     */
    product: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
  };

  /**
   *
   * @name buildJSONLd
   * @summary Builds a JSONLd object from product properties.
   * @return {String} Stringified product jsonld
   */
  buildJSONLd() {
    const { product, shop } = this.props;


    if (!product || !shop) return "";

    const currencyCode = shop.currency.code || "USD";
    const priceData = product.pricing[0];
    // const images = product.media.map((image) => image.URLs.original);

    let productAvailability = "http://schema.org/InStock";
    if (product.isLowQuantity) {
      productAvailability = "http://schema.org/LimitedAvailability";
    }
    if (product.isBackorder && product.isSoldOut) {
      productAvailability = "http://schema.org/PreOrder";
    }
    if (!product.isBackorder && product.isSoldOut) {
      productAvailability = "http://schema.org/SoldOut";
    }

    // Recommended data from https://developers.google.com/search/docs/data-types/product
    // const productJSON = {
    //   "@context": "http://schema.org/",
    //   "@type": "Product",
    //   "brand": product.vendor,
    //   "description": product.description,
    //   "image": images,
    //   "name": product.title,
    //   "sku": product.sku,
    //   "offers": {
    //     "@type": "Offer",
    //     "priceCurrency": currencyCode,
    //     "price": priceData.minPrice,
    //     "availability": productAvailability,
    //     "seller": {
    //       "@type": "Organization",
    //       "name": shop.name
    //     }
    //   }
    // };
    const productJSON = {
      "@context": "http://schema.org/",
      "@type": "Product",
      "brand": "Nike",
      "description": "Vestido com pano leve para usar na praia.",
      "image": ["static/images/home/prod1.png", "static/images/home/prod2.png", "static/images/home/prod3.jpg"],
      "name": "Vestido de Verão",
      "sku": product.sku,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "R$",
        "price": 19.99,
        "availability": productAvailability,
        "seller": {
          "@type": "Organization",
          "name": shop.name
        }
      }
    };

    return JSON.stringify(productJSON);
  }

  renderMainArea() {
    const { addItemsToCart, isLoadingProduct,  shop } = this.props;
    const currencyCode = (shop && shop.currency.code) || "USD";
    if (isLoadingProduct) return <PageLoading />;

    if (!product) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <ProductDetail
        addItemsToCart={addItemsToCart}
        currencyCode={currencyCode}
        product={product}
        shop={shop}
      />

    );
  }

  render() {
    const { shop } = this.props;
    const mock = {
      page: {
        name: product.slug,
        breadcrumb: {
          link: `/product/${product.slug}`,
          root: {
            name: "Produto",
            link: "/product"
          }
        },
        title: "About us !",
        description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
        imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
        banner: "static/images/banner.png",
        pagination: {
          limit: 8,
          actual: 1,
          total: 22,
          visible: "1-4"
        },
        product
      }
    };
    return (
      <Grid container direction="row" justify="center" alignItems="center" >
        <Grid item xs={12}>
          <Helmet
            title={`${product && product.title} | ${shop && shop.name}`}
            meta={[{ name: "description", content: product && product.description }]}
            script={[{ type: "application/ld+json", innerHTML: this.buildJSONLd() }]}
          />
          <Grid container>
            <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
          </Grid>
          {this.renderMainArea()}
        </Grid>
      </Grid>
    );
  }
}

export default ProductDetailPage;
