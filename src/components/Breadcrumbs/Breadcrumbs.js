import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Link from "components/Link";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import TagBreadcrumbs from "./TagBreadcrumb";
import PdpBreadcrumb from "./PdpBreadcrumb";
import CartBreadcrumb from "./CartBreadcrumb";
import * as s from "./style";

const Breadcrumbs = inject("tags")(
  observer(({ isCart, isPDP, isTagGrid, product, tagId, tags }) => {
    const renderBreadcrumbs = () => {
      if (isTagGrid) {
        return <TagBreadcrumbs tags={tags} tagId={tagId} />;
      }

      if (isPDP) {
        return <PdpBreadcrumb tags={tags} tagId={tagId} product={product} />;
      }

      if (isCart) {
        return <CartBreadcrumb />;
      }

      return null;
    };

    return (
      <s.BreadcrumbContainer>
        <Link route="/">
          <s.BreadcrumbLink>Início</s.BreadcrumbLink>
        </Link>
        {renderBreadcrumbs()}
      </s.BreadcrumbContainer>
    );
  })
);

Breadcrumbs.PropTypes = {
  classes: PropTypes.object.isRequired,
  isCart: PropTypes.bool,
  isPDP: PropTypes.bool,
  isTagGrid: PropTypes.bool,
  product: PropTypes.object,
  tagId: PropTypes.string,
  tags: PropTypes.arrayOf(SharedPropTypes.tag).isRequired
};

export default Breadcrumbs;
