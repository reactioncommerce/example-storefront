import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = (theme) => ({
  orderStatusNew: {
    backgroundColor: `${theme.palette.reaction.darkBlue300}`,
    color: "white",
    fontWeight: "800"
  },
  orderStatusCanceled: {
    backgroundColor: `${theme.palette.reaction.red300}`,
    color: "white",
    fontWeight: "800"
  },
  orderStatusProcessing: {
    backgroundColor: `${theme.palette.reaction.darkBlue300}`,
    color: "white",
    fontWeight: "800"
  },
  orderStatusShipped: {
    backgroundColor: `${theme.palette.reaction.reactionBlue}`,
    color: "white",
    fontWeight: "800"
  }
});

class OrderCardStatusBadge extends Component {
  static propTypes = {
    classes: PropTypes.object,
    displayStatus: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  };

  render() {
    const { classes, displayStatus, status } = this.props;
    let classess;

    if (status === "coreOrderWorkflow/canceled") {
      classess = classes.orderStatusCanceled;
    }

    if (status === "new") {
      classess = classes.orderStatusNew;
    }

    if (status === "coreOrderWorkflow/processing") {
      classess = classes.orderStatusProcessing;
    }

    if (status === "coreOrderWorkflow/completed") {
      classess = classes.orderStatusShipped;
    }

    return <Chip label={displayStatus} className={classess} />;
  }
}

export default withStyles(styles, { withTheme: true })(OrderCardStatusBadge);
