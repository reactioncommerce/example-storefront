import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    flex: 0,
    flexBasis: "auto",
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "0.7rem",
    paddingRight: theme.spacing(),
    paddingLeft: theme.spacing(),
    letterSpacing: "0.1rem"
  },
  item: {
    flex: "1 1 auto",
    border: 0,
    borderTop: "1px solid",
    borderColor: theme.palette.reaction.borderColor,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
});

/**
 * A divider for variant options
 * @export
 * @class Divider
 */
class Divider extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string
  }

  render() {
    const { classes: { container, item, label: labelClass }, label } = this.props;

    return (
      <div className={container}>
        <hr className={item} />
        {!!label && <Typography component="span" className={labelClass}>{label}</Typography>}
        <hr className={item} />
      </div>
    );
  }
}

export default withStyles(styles)(Divider);
