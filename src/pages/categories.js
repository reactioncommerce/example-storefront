import React from "react";
import Helmet from "react-helmet";
import Breadcrumb from "components/Breadcrumb";
import CategoryResult from "components/CategoryResult";
import { Row, Container } from "react-grid-system";
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
      products: [{
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod3.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod3.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod5.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod3.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod3.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod5.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod3.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod3.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod1.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod2.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod5.jpg"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/home/prod4.jpg"

      }]
    }
  };

  return (
    <div>
      <Container fluid>
        <Helmet title={"Categories"} meta={[{ name: "description", content: shop && shop.description }]} />
        <Container>
          <Row align="flex-start" justify="flex-start">
            <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/> 
          </Row>
        </Container>
        <Row direction="column" align="center" justify="center">
          <CategoryResult page={mock.page}/>
        </Row>
        <InfoCarousel/>
      </Container>
    </div>
  );
};

export default Categories;
