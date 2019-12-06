import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";
import ProductResults from "components/ProductResults";
import { Row, Container } from "react-grid-system";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import InfoCarousel from "components/InfoCarousel";


const Search = inject("routingStore")(observer(({ routingStore }) => {
  const mock = {
    page: {
      name: "slugOrId",
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
      products: [{
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "../static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "../static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "../static/images/home/prod3.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "../static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "../static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "../static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "../static/images/home/prod3.jpg"

      }]
    }
  };
  return (
    <div>
      <Container fluid>
        {/* <Helmet title={"Search Results"} meta={[{ name: "description", content: shop && shop.description }]} /> */}
        <Container>
          <Row  align="start" justify="start">
            <Breadcrumb routingStore={routingStore} pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
          </Row>
        </Container>
        <Row direction="column" align="center" justify="center">
          <ProductsResult page={mock.page} routingStore={routingStore}/>
        </Row>
        <InfoCarousel/>
      </Container>
    </div>
  );
}));

Search.propTypes = {
  // router: PropTypes.object.isRequired,
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default Search;
