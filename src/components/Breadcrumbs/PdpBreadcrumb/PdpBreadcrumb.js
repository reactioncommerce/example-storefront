import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import Link from "components/Link";
import TagBreadcrumbs from "../TagBreadcrumb/TagBreadcrumbs";
import * as s from "../style";

const PdpBreadcrumb = ({ tags, tagId, product }) => {
  if (tagId) {
    return (
      <Fragment>
        <TagBreadcrumbs tags={tags} tagId={tagId} />
        <s.BreadcrumbSeparator>/</s.BreadcrumbSeparator>
        <Link route={`/product/${product.slug}`}>
          <s.BreadcrumbLink>{product.title}</s.BreadcrumbLink>
        </Link>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <s.BreadcrumbSeparator>/</s.BreadcrumbSeparator>
      <Link route={`/product/${product.slug}`}>
        <s.BreadcrumbLink>{product.title}</s.BreadcrumbLink>
      </Link>
    </Fragment>
  );
};

PdpBreadcrumb.PropTypes = {
  product: PropTypes.object,
  tagId: PropTypes.string,
  tags: PropTypes.arrayOf(SharedPropTypes.tag)
};

export default PdpBreadcrumb;
