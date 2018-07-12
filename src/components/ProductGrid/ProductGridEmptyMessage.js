import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
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
  actionMessage: {
    color: theme.palette.reaction.coolGrey400
  },
  notFoundMessage: {
    color: theme.palette.reaction.black65
  }
});

@withStyles(styles)
@inject("routingStore")
export default class ProductGridEmptyMessage extends Component {
  static propTypes = {
    actionMessage: PropTypes.string,
    classes: PropTypes.object,
    notFoundMessage: PropTypes.string,
    resetLink: PropTypes.string,
    routingStore: PropTypes.object
  }

  static defaultProps = {
    actionMessage: "Clear filters",
    notFoundMessage: "Sorry! We couldn't find what you're looking for."
  }

  render() {
    const { classes, actionMessage, notFoundMessage, resetLink: providedResetLink, routingStore } = this.props;

    let resetLink = providedResetLink || routingStore.pathname;
    if (!providedResetLink && routingStore && routingStore.query && routingStore.query.slug) {
      resetLink = `${routingStore.pathname}/${routingStore.query.slug}`;
    }

    return (
      <div className={classes.root}>
        <Typography className={classes.notFoundMessage} paragraph>{notFoundMessage}</Typography>
        <Typography className={classes.actionMessage}>
          <Link route={resetLink}>{actionMessage}</Link>
        </Typography>
      </div>
    );
  }
}
