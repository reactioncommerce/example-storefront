import React, { Fragment } from "react";
import Link from "components/Link";
import * as s from "../style";

const CartBreadcrumb = () => (
  <Fragment>
    <s.BreadcrumbSeparator>/</s.BreadcrumbSeparator>
    <Link route={"/cart"}>
      <s.BreadcrumbLink>Meu Carrinho</s.BreadcrumbLink>
    </Link>
  </Fragment>
);

export default CartBreadcrumb;
