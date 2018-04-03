import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import withData from "./../lib/apollo/withData";
import withRoot from "./../lib/theme/withRoot";
import Header from "./../components/Header";
import Profile from "./../components/Profile";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

@withData
@withRoot
@withStyles(styles)
class Shop extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Profile />
        <p>Index Page</p>
      </div>
    )
  }
}

export default Shop;
