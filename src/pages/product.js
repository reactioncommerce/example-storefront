import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Typography from "material-ui/Typography";

import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import VariantList from "components/VariantList";

@withData
@withRoot
@withShop
@inject("uiStore")
@observer
class ProductDetail extends Component {
  render() {
    return (
      <Layout>
        <Typography variant="display1">Product Page!</Typography>
        <VariantList />
      </Layout>
    );
  }
}

export default ProductDetail;
