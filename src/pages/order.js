import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";
import OrderDetail from "components/OrderDetail";
import { Container } from "react-grid-system";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import ORDERS_MOCK from "helpers/ORDERS_MOCK.json";


const Order = inject("routingStore")(observer(({ routingStore }) => {
  const mock = {
    page: {
      name: "Detalhes do pedido",
      breadcrumb: {
        link: `/orders/${routingStore.query}`,
        root: {
          name: "Pedidos",
          link: null
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
      orders: ORDERS_MOCK
    }
  };
  return (
    <Container style={{ background: "#f1f1f1" }} fluid>
      {/* <Helmet title={"Search Results"} meta={[{ name: "description", content: shop && shop.description }]} /> */}
      <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
      <OrderDetail />
    </Container>
  );
}));

Order.propTypes = {
  // router: PropTypes.object.isRequired,
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default Order;