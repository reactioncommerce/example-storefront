import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ChevronRight from "mdi-material-ui/ChevronRight";
import Link from "components/Link";


const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    maxWidth: theme.grid.productGridMaxWidth,
    marginLeft: "auto",
    marginRight: "auto"
  },
  breadcrumbLink: {
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
    color: "#3c3c3c",
    border: 0,
    textDecoration: "underline",
    margin: "0 7px"
  },
  breadcrumbIcon: {
    fontSize: "14px"
  }
});

@withStyles(styles)
class Breadcrumbs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isPDP: PropTypes.bool,
    isTagGrid: PropTypes.bool,
    product: PropTypes.object,
    tag: PropTypes.object,
    tags: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired
    })
  }

  get isPDP() {
    const { isPDP } = this.props;
    return isPDP || false;
  }

  get isTagGrid() {
    const { isTagGrid } = this.props;
    return isTagGrid || false;
  }

  get isTopLevel() {
    const { tag } = this.props;

    return tag && tag.isTopLevel;
  }

  renderTopLevelTagBreadcrumb = (tag) => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, tag: propTag } = this.props;

    const currentTag = tag || propTag;

    return (
      <Fragment>
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/tag/${currentTag.slug}`}><span className={breadcrumbLink}>{currentTag.name}</span></Link>
      </Fragment>
    );
  }

  renderSecondLevelTagBreadcrumb = (tag) => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, tag: propTag, tags } = this.props;
    const currentTag = tag || propTag;

    console.log("tags", tags);


    // Find tag that is a parent of this tag
    const nodes = tags.edges.map((edge) => edge.node);
    const parentTag = nodes.find((node) => node.subTagIds.includes(currentTag._id));

    return (
      <Fragment>
        {this.renderTopLevelTagBreadcrumb(parentTag)}
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/tag/${currentTag.slug}`}><span className={breadcrumbLink}>{currentTag.name}</span></Link>
      </Fragment>
    );
  }

  renderTagBreadcrumbs = (tag) => {
    if (this.isTopLevel || (tag && tag.isTopLevel)) {
      return this.renderTopLevelTagBreadcrumb(tag);
    }
    return this.renderSecondLevelTagBreadcrumb(tag);
  }

  renderProductNameBreadcrumb = () => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, product, tag } = this.props;

    if (tag && tag._id) {
      return (
        <Fragment>
          {this.renderTagBreadcrumbs(tag)}
          <ChevronRight className={breadcrumbIcon} />
          <Link route={`/product/${product.slug}`}><span className={breadcrumbLink}>{product.title}</span></Link>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/product/${product.slug}`}><span className={breadcrumbLink}>{product.title}</span></Link>
      </Fragment>
    );
  }

  renderBreadcrumbs = () => {
    if (this.isTagGrid) {
      return this.renderTagBreadcrumbs();
    }

    if (this.isPDP) {
      return this.renderProductNameBreadcrumb();
    }

    return null;
  }

  render() {
    const { classes: { container, breadcrumbLink } } = this.props;

    return (
      <div className={container}>
        <Link route="/"><span className={breadcrumbLink}>Home</span></Link>
        {this.renderBreadcrumbs()}
      </div>
    );
  }
}

export default Breadcrumbs;
