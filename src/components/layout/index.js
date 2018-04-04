import React from "react";
import Head from "next/head";
import Header from "components/header";

export default ({ children, title = '' }) => (
  <div>
    <Head>
      <title key="title">{title}</title>
    </Head>
    <Header />

    {children}

  </div>
)