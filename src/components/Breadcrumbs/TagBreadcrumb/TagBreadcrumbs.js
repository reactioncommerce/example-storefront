import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import Link from "components/Link";
import * as s from "../style";

const TagBreadcrumbs = ({ tags, tagId }) => {
  const renderTagBreadcrumbPiece = (tag) => {
    // Find first tag that is a parent of this tag, if any are
    const parentTag = tags.find((node) => node.subTagIds.includes(tag._id));

    return (
      <Fragment>
        {!!parentTag && renderTagBreadcrumbPiece(parentTag)}
        <s.BreadcrumbSeparator>/</s.BreadcrumbSeparator>
        <Link route={`/category/${tag.slug}`}>
          <s.BreadcrumbLink>{tag.name}</s.BreadcrumbLink>
        </Link>
      </Fragment>
    );
  };

  if (!tagId || !Array.isArray(tags) || tags.length === 0) return null; // still loading

  const currentTag = tags.find((tag) => tag._id === tagId);
  if (!currentTag) {
    throw new Error(`Unable to find current tag with ID ${tagId}`);
  }

  return renderTagBreadcrumbPiece(currentTag);
};

TagBreadcrumbs.PropTypes = {
  tagId: PropTypes.string,
  tags: PropTypes.arrayOf(SharedPropTypes.tag)
};

export default TagBreadcrumbs;
