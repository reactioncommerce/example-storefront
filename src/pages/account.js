import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";
import OrdersList from "components/OrdersList";
import { Row, Container } from "react-grid-system";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import MyAccount from "components/MyAccount";
import PRODUCTS_MOCK from "helpers/PRODUCTS_MOCK.json";


const Account = inject("routingStore")(observer(({ routingStore }) => {
  const mock = {
    page: {
      name: "Minha Conta",
      breadcrumb: {
        link: "/account",
        root: {
          name: null,
          link: null
        }
      },
      title: "Minha Conta",
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
      account: {
        fullname: "Denis Manzetti",
        birthday: "05/03/1994",
        cpf: "543.476.234.98",
        cep: "05440-000",
        province: "São Paulo",
        address: "Rua colonia da glória",
        number: "206",
        addon: "",
        tel: "+5511940653412"
      },
      products: PRODUCTS_MOCK
    }
  };
  return (
    <Container fluid styles={{ background: "#f1f1f1;" }}>
      {/* <Helmet title={"Search Results"} meta={[{ name: "description", content: shop && shop.description }]} /> */}
      <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>
      <MyAccount title={mock.page.title} description={mock.page.description} account={mock.page.account}/>
      
    </Container>
  );
}));

Account.propTypes = {
  // router: PropTypes.object.isRequired,
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default Account;