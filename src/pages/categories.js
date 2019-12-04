import React from "react";
import Helmet from "react-helmet";
import Breadcrumb from "components/Breadcrumb";
import CategoryResult from "components/CategoryResult";

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
      limit: 8,
      description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
      imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
      banner: "static/images/banner.png",
      order: {
        total: "22",
        visible: "1-4"
      },
      products: [{
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }, {
        title: "Vestido",
        price: "99.99",
        cashPrice: "79.99",
        photo: "static/images/vestido.png"

      }]
    }
  };

  return (
    <div>
      <Helmet title={"Categories"} meta={[{ name: "description", content: shop && shop.description }]} />
      <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
      <CategoryResult page={mock.page}/>

    </div>
  );
};

export default Categories;
