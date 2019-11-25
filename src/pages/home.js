import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";

@withCatalogItems
@inject("routingStore", "uiStore")
@observer
class HomePage extends Component {
  static propTypes = {
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
  };

  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTagId(null);
  }

  render() {
    const { shop } = this.props;
    const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

    return (
      <Fragment>
        <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
        <span>home page</span>
      </Fragment>
    );
  }
}

export default HomePage;
