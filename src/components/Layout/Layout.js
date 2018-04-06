import React from "react";
import Helmet from "react-helmet";
import Header from "components/Header";

export default ({ children, title = "" }) => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Header />

    {children}

  </div>
);
