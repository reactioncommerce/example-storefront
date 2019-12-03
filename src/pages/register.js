import React from "react";
import Helmet from "react-helmet";
import RegisterForm from "components/RegisterForm";

const RegisterPage = (shop) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <div>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <RegisterForm/>
    </div>
  );
};

export default RegisterPage;
