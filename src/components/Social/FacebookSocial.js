import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function getFacebookMeta(meta) {
  const metadata = [
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: meta.siteName },
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.description }
  ];

  return metadata;
}

/**
 * Add Facebook Open Graph meta data to react-helmet
 * @class FacebookSocial
 */
export default class FacebookSocial extends Component {
  static propTypes = {
    meta: PropTypes.object
  }

  render() {
    return (
      <Helmet
        meta={getFacebookMeta(this.props.meta)}
      />
    );
  }
}
