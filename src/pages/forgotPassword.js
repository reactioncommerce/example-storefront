import React from "react";
import Helmet from "react-helmet";
import ForgotPasswordForm from "components/ForgotPasswordForm";

const forgotPassword = (shop) => {
  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <div>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <ForgotPasswordForm/>
    </div>
  );
};

export default forgotPassword;
