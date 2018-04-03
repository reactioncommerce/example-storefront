import React, { Component } from "react";
import withData from "./../lib/apollo/withData";
import withRoot from "./../lib/theme/withRoot";
import Header from "./../components/Header";
import Profile from "./../components/Profile";

@withData
@withRoot
class Shop extends Component {
  render() {
    return (
      <div>
        <Header />
        <Profile />
      </div>
    )
  }
}

export default Shop;
