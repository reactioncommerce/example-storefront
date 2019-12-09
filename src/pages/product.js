import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import ProductDetail from "components/ProductDetail";
import Breadcrumb from "components/Breadcrumb";
import InfoCarousel from "components/InfoCarousel";
import Newsletter from "components/Newsletter";
import { Container, Row } from "react-grid-system";
import withCatalogItems from "containers/catalog/withCatalogItems";

import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import product from "helpers/PRODUCT_MOCK.json";
import ProductList from "../components/ProductList";


const ProductDetailPage = inject(
  "routingStore",
  "uiStore"
)(observer(({ routingStore, shop, catalogItems, isLoadingCatalogItems }) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

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
      newsletter: {
        title: "Subscribe our newsletter",
        description: "Pellentesque habitant morbi tristique senectus et netus et",
        callToAction: "Subscribe"
      },
      product
    }
  };

  return (
    <Container style={{ background: "#fafafa" }} fluid>
      <Row align="center" justify="start">
        <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      </Row>
      <Container>
        <Row align="start" justify="start">
          <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
        </Row>
      </Container>
      <ProductDetail product={product} />
      <ProductList catalogItems={catalogItems} isLoadingCatalogItems={isLoadingCatalogItems} />


      <Newsletter newsletter={mock.page.newsletter}/>
      <InfoCarousel/>
    </Container>
  );
}));

ProductDetailPage.propTypes = {
  catalogItems: PropTypes.array,
  catalogItemsPageInfo: PropTypes.object,
  isLoadingCatalogItems: PropTypes.bool,
  routingStore: PropTypes.object,
  shop: PropTypes.shape({
    currency: PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  })
};

export default withCatalogItems(ProductDetailPage);
