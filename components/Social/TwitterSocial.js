import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

/**
 * Generates Twitter metadata
 *
 * @param {object} meta - Twitter metadata information
 * @returns  {Array} - Array of objects with metadata properties.
 */
function getTwitterMeta(meta) {
  const metadata = [
    { property: "twitter:card", content: "summary" },
    { property: "twitter:site", content: meta.siteName },
    { property: "twitter:title", content: meta.title },
    { property: "twitter:description", content: meta.description }
  ];

  if (meta.media) {
    let media;

    if (!/^http(s?):\/\/+/.test(meta.media)) {
      media = location.origin + meta.media;
    }

    metadata.push({
      property: "twitter:image",
      content: media
    });
  }

  return metadata;
}

/**
 * Add Twitter meta data to react-helmet
 * @class TwitterSocial
 */
export default class TwitterSocial extends Component {
  static propTypes = {
    meta: PropTypes.object
  }

  render() {
    return (
      <Helmet
        meta={getTwitterMeta(this.props.meta)}
      />
    );
  }
}
