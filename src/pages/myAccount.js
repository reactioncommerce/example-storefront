import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";
import ProductResults from "components/ProductResults";
import { Row, Container } from "react-grid-system";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import InfoCarousel from "components/InfoCarousel";
import PRODUCTS_MOCK from "pages/PRODUCTS_MOCK.json";


const MyAccount = inject("routingStore")(observer(({ routingStore }) => {
  const mock = {
    page: {
      name: routingStore.query.slugOrId,
      breadcrumb: {
        link: "`/search/`",
        root: {
          name: "Busca",
          link: "/search"
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
      products: PRODUCTS_MOCK
    }
  };
  return (
    <div>
      <Container fluid>
        {/* <Helmet title={"Search Results"} meta={[{ name: "description", content: shop && shop.description }]} /> */}
        <Container>
          <Row align="start" justify="start">
            <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
          </Row>
        </Container>
        <Row direction="column" align="center" justify="center">
          <ProductResults page={mock.page} />
        </Row>
        <InfoCarousel/>
      </Container>
    </div>
  );
}));

MyAccount.propTypes = {
  // router: PropTypes.object.isRequired,
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default MyAccount;
