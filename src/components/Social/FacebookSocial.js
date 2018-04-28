import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function getFacebookMeta(props) {
  const meta = [
    { "property": "og:type", "content": "article" },
    { "property": "og:site_name", "content": props.siteName },
    { "property": "og:title", "content": props.title },
    { "property": "og:description", "content": props.description }
  ];

  return meta;
}

export default class FacebookSocial extends Component {
  render() {
    return (
      <Helmet
        meta={getFacebookMeta(this.props)}
      />
    );
  }
}

FacebookSocial.propTypes = {
  settings: PropTypes.object
};
