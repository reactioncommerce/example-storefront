import React from "react";
import Helmet from "react-helmet";
import LoginForm from "components/LoginForm";
import { Container, Row } from "react-grid-system";

const Login = (shop) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <Container fluid>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
        
      <LoginForm/>
    </Container>
  );
};

export default Login;
