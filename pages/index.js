import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import withData from "./../lib/apollo/withData";
import withRoot from "./../lib/theme/withRoot";
import Header from "./../components/Header";
import Profile from "./../components/Profile";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 0
  }
});

@withData
@withRoot
@withStyles(styles)
class Shop extends Component {
  static propTypes = {
    classes: PropTypes.object
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Profile />
        <Typography variant="body2">Index Page</Typography>
      </div>
    );
  }
}

export default Shop;
