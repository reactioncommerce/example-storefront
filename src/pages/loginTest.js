import React from "react";
import Helmet from "react-helmet";
import LoginForm from "components/LoginForm";
import { Container, Row } from "react-grid-system";

const LoginPage = (shop) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <Container fluid>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <Row align="center" justify="center">

        <LoginForm/>
      </Row>
    </Container>
  );
};

export default LoginPage;
