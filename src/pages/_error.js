import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "components/Link";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem"
  }
};

@withStyles(styles)
export default class Error extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.object,
    statusCode: PropTypes.object
  }

  static getInitialProps({ res, err }) {
    // eslint-disable-next-line
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { classes, shop } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>{shop && shop.name} | Error</title>
        </Helmet>
        {this.props.statusCode ? (
          <Typography> `An error ${this.props.statusCode} occurred on server`</Typography>
        ) : (
          <Fragment>
            <Typography paragraph>Sorry! We couldn't find what you're looking for.</Typography>
            <Typography>
              <Link route="/">Home</Link>
            </Typography>
          </Fragment>
        )}
      </div>
    );
  }
}
