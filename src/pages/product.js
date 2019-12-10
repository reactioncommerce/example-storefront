import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import ProductDetail from "components/ProductDetail";
import InfoCarousel from "components/InfoCarousel";
import Newsletter from "components/Newsletter";
import { Container, Row } from "react-grid-system";
import withCart from "containers/cart/withCart";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import PageLoading from "components/PageLoading";

import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
// import product from "helpers/PRODUCT_MOCK.json";
import ProductList from "../components/ProductList";
import ErrorPage from "./_error";

const ProductDetailPage = inject()(
  // "routingStore",
  // "uiStore"
  observer(({ shop, catalogItems, isLoadingCatalogItems, addItemsToCart, isLoadingProduct, product }) => {
    // const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

    // const mock = {
    //   page: {
    //     // name: product.slug,
    //     // breadcrumb: {
    //     //   link: `/product/${product.slug}`,
    //     //   root: {
    //     //     name: "Produto",
    //     //     link: "/product"
    //     //   }
    //     // },
    //     title: "About us !",
    //     description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed
    //    imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at.
    //    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
    //     banner: "static/images/banner.png",
    //     pagination: {
    //       limit: 8,
    //       actual: 1,
    //       total: 22,
    //       visible: "1-4"
    //     },
    //     newsletter: {
    //       title: "Subscribe our newsletter",
    //       description: "Pellentesque habitant morbi tristique senectus et netus et",
    //       callToAction: "Subscribe"
    //     },
    //     product
    //   }
    // };

    /**
     *
     * @name buildJSONLd
     * @summary Builds a JSONLd object from product properties.
     * @return {String} Stringified product jsonld
     */
    const buildJSONLd = () => {
      if (!product || !shop) return "";

      const currencyCode = shop.currency.code || "USD";
      const priceData = product.pricing[0];
      const images = product.media.map((image) => image.URLs.original);

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
      const productJSON = {
        "@context": "http://schema.org/",
        "@type": "Product",
        brand: product.vendor,
        description: product.description,
        image: images,
        name: product.title,
        sku: product.sku,
        offers: {
          "@type": "Offer",
          priceCurrency: currencyCode,
          price: priceData.minPrice,
          availability: productAvailability,
          seller: {
            "@type": "Organization",
            name: shop.name
          }
        }
      };

      return JSON.stringify(productJSON);
    };

    const renderMainArea = () => {
      const currencyCode = (shop && shop.currency.code) || "USD";

      if (isLoadingProduct) return <PageLoading />;

      if (!product) return <ErrorPage shop={shop} subtitle="Not Found" />;

      return (
        <ProductDetail addItemsToCart={addItemsToCart} currencyCode={currencyCode} product={product} shop={shop} />
      );
    };

    return (
      <Container style={{ background: "#fafafa" }} fluid>
        <Row align="center" justify="start">
          <Helmet
            title={`${product && product.title} | ${shop && shop.name}`}
            meta={[{ name: "description", content: product && product.description }]}
            script={[{ type: "application/ld+json", innerHTML: buildJSONLd() }]}
          />
        </Row>

        {renderMainArea()}
        <ProductList catalogItems={catalogItems} isLoadingCatalogItems={isLoadingCatalogItems} />
        {/* <Newsletter newsletter={mock.page.newsletter} /> */}
        <InfoCarousel />
      </Container>
    );
  })
);

ProductDetailPage.propTypes = {
  addItemsToCart: PropTypes.func,
  catalogItems: PropTypes.array,
  catalogItemsPageInfo: PropTypes.object,
  isLoadingCatalogItems: PropTypes.bool,
  isLoadingProduct: PropTypes.bool,
  product: PropTypes.object,
  routingStore: PropTypes.object,
  shop: PropTypes.shape({
    currency: PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  })
};

export default withCart(withCatalogItemProduct(withCatalogItems(ProductDetailPage)));
