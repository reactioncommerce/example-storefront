import React, { Component, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import MainCarousel from "../components/MainCarousel";
import ProductList from "../components/ProductList";
import SelectedProducts from "../components/SelectedProducts";
import CategoriesBlock from "../components/CategoriesBlock";
import SpecificProduct from "../components/SpecificProduct";
import UserComments from "../components/UserComments";
import InfoCarousel from "../components/InfoCarousel";

const HomePage = inject(
  "routingStore",
  "uiStore"
)(observer(({ routingStore, shop }) => {
  // const { shop } = this.props;
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  useEffect(() => {
    routingStore.setTagId(null);
  }, []);

  return (
    <Fragment>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <MainCarousel />
      <ProductList />
      <SelectedProducts />
      <CategoriesBlock />
      <SpecificProduct />
      <UserComments />
      <InfoCarousel />
    </Fragment>
  );
}));

HomePage.propTypes = {
  routingStore: PropTypes.object,
  shop: PropTypes.shape({
    currency: PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  })
};

export default withCatalogItems(HomePage);
