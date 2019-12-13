import React from "react";
import Helmet from "react-helmet";
import Breadcrumb from "components/Breadcrumb";
import ProductResults from "components/ProductResults";
import { Row, Container } from "react-grid-system";
import PRODUCTS_MOCK from "helpers/PRODUCTS_MOCK.json";
import InfoCarousel from "../components/InfoCarousel";

const Categories = (shop) => {
  const mock = {
    page: {
      name: "Vestidos",
      breadcrumb: {
        link: "/categories/vestidos",
        root: {
          name: "Categorias",
          link: "/categories"
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
        <Helmet title={"Categories"} meta={[{ name: "description", content: shop && shop.description }]} />
        <Container>
          <Row align="start" justify="start">
            <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
          </Row>
        </Container>
        <Row direction="column" align="center" justify="center">
          <ProductResults page={mock.page}/>
        </Row>
        <InfoCarousel/>
      </Container>
    </div>
  );
};

export default Categories;