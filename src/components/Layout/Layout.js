import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "components/Header";
import { Cart } from "components/Cart";

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
  };

  static defaultProps = {
    title: ""
  };

  render() {
    const { children, title } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <main>{children}</main>
        <Cart />
      </div>
    );
  }
}

export default Layout;
