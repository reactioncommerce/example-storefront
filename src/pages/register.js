import React from "react";
import Helmet from "react-helmet";
import RegisterForm from "components/RegisterForm";
import { Container, Row } from "react-grid-system";

const RegisterPage = (shop) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <Container fluid>
      <Row align="center" justify="center"> 
        <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
        <RegisterForm/>
      </Row>
    </Container>
  );
};

export default RegisterPage;
