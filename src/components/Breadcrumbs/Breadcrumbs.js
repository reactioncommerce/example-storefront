import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Link from "components/Link";
import SharedPropTypes from "lib/utils/SharedPropTypes";

const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    maxWidth: theme.layout.mainContentMaxWidth,
    // marginLeft: "auto",
    // marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  breadcrumbLink: {
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
    color: "#4f4d4d",
    border: 0,
    textDecoration: "none",
    margin: "0 7px"
  },
  lastBreadcrumbLink: {
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
    color: "#00c3cb",
    border: 0,
    textDecoration: "none",
    margin: "0 7px"
  },
  breadcrumbIcon: {
    fontSize: "14px"
  },
  breadcrumbSeparator: {
    margin: "0 2px"
  }
});

@inject("tags")
@withStyles(styles, { name: "SkBreadcrumbs" })
class Breadcrumbs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isCart: PropTypes.bool,
    isPDP: PropTypes.bool,
    isTagGrid: PropTypes.bool,
    product: PropTypes.object,
    tagId: PropTypes.string,
    tags: PropTypes.arrayOf(SharedPropTypes.tag).isRequired
  };

  renderTagBreadcrumbPiece(tag) {
    const {
      classes: { breadcrumbSeparator, breadcrumbLink },
      tags
    } = this.props;

    // Find first tag that is a parent of this tag, if any are
    const parentTag = tags.find((node) => node.subTagIds.includes(tag._id));

    return (
      <Fragment>
        {!!parentTag && this.renderTagBreadcrumbPiece(parentTag)}
        <span className={breadcrumbSeparator}>/</span>
        <Link route={`/category/${tag.slug}`}>
          <span className={breadcrumbLink}>{tag.name}</span>
        </Link>
      </Fragment>
    );
  }

  renderTagBreadcrumbs() {
    const { tagId, tags } = this.props;

    if (!tagId || !Array.isArray(tags) || tags.length === 0) return null; // still loading

    const currentTag = tags.find((tag) => tag._id === tagId);
    if (!currentTag) {
      throw new Error(`Unable to find current tag with ID ${tagId}`);
    }

    return this.renderTagBreadcrumbPiece(currentTag);
  }

  renderProductNameBreadcrumb = () => {
    const {
      classes: { breadcrumbSeparator, breadcrumbLink },
      product,
      tagId
    } = this.props;

    if (tagId) {
      return (
        <Fragment>
          {this.renderTagBreadcrumbs()}
          <span className={breadcrumbSeparator}>/</span>
          <Link route={`/product/${product.slug}`}>
            <span className={breadcrumbLink}>{product.title}</span>
          </Link>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <span className={breadcrumbSeparator}>/</span>
        <Link route={`/product/${product.slug}`}>
          <span className={breadcrumbLink}>{product.title}</span>
        </Link>
      </Fragment>
    );
  };

  renderCartBreadcrumbs = () => {
    const {
      classes: { breadcrumbSeparator, lastBreadcrumbLink }
    } = this.props;

    return (
      <Fragment>
        <span className={breadcrumbSeparator}>/</span>
        <Link route={"/cart"}>
          <span className={lastBreadcrumbLink}>Meu carrinho</span>
        </Link>
      </Fragment>
    );
  };

  renderBreadcrumbs() {
    const { isPDP, isTagGrid, isCart } = this.props;

    if (isTagGrid) {
      return this.renderTagBreadcrumbs();
    }

    if (isPDP) {
      return this.renderProductNameBreadcrumb();
    }

    if (isCart) {
      return this.renderCartBreadcrumbs();
    }

    return null;
  }

  render() {
    const {
      classes: { container, breadcrumbLink }
    } = this.props;

    return (
      <div className={container}>
        <Link route="/">
          <span className={breadcrumbLink}>Início</span>
        </Link>
        {this.renderBreadcrumbs()}
      </div>
    );
  }
}

export default Breadcrumbs;
