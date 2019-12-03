import React from "react";
import Helmet from "react-helmet";
import LoginForm from "components/LoginForm";

const LoginPage = (shop) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <div>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
