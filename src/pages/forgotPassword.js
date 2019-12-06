import React from "react";
import Helmet from "react-helmet";
import ForgotPasswordForm from "components/ForgotPasswordForm";
import { Container, Row } from "react-grid-system";

const forgotPassword = (shop) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <Container fluid>
      <Row align="center" justify="center">
        <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
        <ForgotPasswordForm/>
      </Row>
    </Container>

  );
};

export default forgotPassword;
