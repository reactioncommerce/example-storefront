import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "components/Link";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "4rem"
  },
  errorMessage: {
    color: theme.palette.reaction.black65
  },
  errorLink: {
    color: theme.palette.reaction.coolGrey400
  }
});

class Error extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.object,
    statusCode: PropTypes.number,
    subtitle: PropTypes.string
  };

  static getInitialProps({ res, err }) {
    let { statusCode } = res;

    // Did not receive an OK response
    if (!statusCode) {
      statusCode = err ? err.statusCode : null;
    }

    return { statusCode };
  }

  static defaultProps = {
    subtitle: "Page Not Found"
  };

  render() {
    const { classes, shop, statusCode, subtitle } = this.props;

    return (
      <div className={classes.root}>
        <Helmet title={`${subtitle} | ${shop && shop.name}`} />
        {statusCode ? (
          <Typography variant="h5">{statusCode}</Typography>
        ) : (
          <Fragment>
            <Typography className={classes.errorMessage} paragraph>
              Sorry! We couldn't find what you're looking for.
            </Typography>
            <Typography className={classes.errorLink}>
              <Link route="/">Home</Link>
            </Typography>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Error);
