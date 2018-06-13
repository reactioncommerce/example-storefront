import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ChevronRight from "mdi-material-ui/ChevronRight";
import Link from "components/Link";

import withTags from "containers/tags/withTags";

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
    letterSpacing: "0.3px",
    color: "#3c3c3c",
    border: 0,
    borderBottom: "1px solid",
    borderColor: theme.palette.reaction.borderColor,
    margin: "0 7px"
  },
  breadcrumbIcon: {
    fontSize: "14px"
  }
});

/**
 * A Breadcrumb component
 * @export
 * @class Breadcrumbs
 */
@withStyles(styles)
class Breadcrumbs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isPDP: PropTypes.bool,
    isTagGrid: PropTypes.bool,
    product: PropTypes.object,
    tag: PropTypes.object,
    tags: PropTypes.object
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

  renderTopLevelTagBreadcrumbs = (tag) => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, tag: propTag } = this.props;

    const currentTag = tag || propTag;

    return (
      <Fragment>
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/tag/${currentTag.slug}`}><span className={breadcrumbLink}>{currentTag.name}</span></Link>
      </Fragment>
    );
  }

  renderSecondLevelTagBreadcrumbs = (tag) => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, tag: propTag, tags } = this.props;

    console.log("proptTag", propTag);
    console.log("tag", tag);



    const currentTag = tag || propTag;

    // Find tag that is a parent of this tag
    const nodes = tags.edges.map((edge) => edge.node);
    const parentTag = nodes.find((node) => node.subTagIds.includes(currentTag._id));

    return (
      <Fragment>
        {this.renderTopLevelTagBreadcrumbs(parentTag)}
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/tag/${currentTag.slug}`}><span className={breadcrumbLink}>{currentTag.name}</span></Link>
      </Fragment>
    );
  }

  renderTagGridBreadcrumbs = (tag) => {
    if (this.isTopLevel || (tag && tag.isTopLevel)) {
      return this.renderTopLevelTagBreadcrumbs(tag);
    }
    return this.renderSecondLevelTagBreadcrumbs(tag);
  }

  renderPDPBreadCrumbs = () => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, product } = this.props;

    console.log("product", product);

    const tag = {
      isTopLevel: false,
      name: "Tag A-2",
      position: null,
      slug: "tag-a-2",
      subTagIds: [],
      _id: "cmVhY3Rpb24vdGFnOkpCNEZSQmlXZHVOc3hoaGhu"
    };


    return (
      <Fragment>
        {this.renderTagGridBreadcrumbs(tag)}
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/product/${product.slug}`}><span className={breadcrumbLink}>{product.title}</span></Link>
      </Fragment>
    );
  }

  renderBreadcrumbs = () => {
    if (this.isTagGrid) {
      return this.renderTagGridBreadcrumbs();
    }

    if (this.isPDP) {
      return this.renderPDPBreadCrumbs();
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

export default withTags(Breadcrumbs);
