import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

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
    paddingRight: theme.spacing.unit * 1.25,
    paddingLeft: theme.spacing.unit * 1.25,
    letterSpacing: "0.1rem"
  },
  item: {
    flex: "1 1 auto",
    border: 0,
    borderTop: "1px solid",
    borderColor: theme.palette.reaction.borderColor,
    marginTop: theme.spacing.unit * 2.25,
    marginBottom: theme.spacing.unit * 2.25
  }
});

/**
 * A divider for variant options
 * @export
 * @class Divider
 */
@withStyles(styles)
export default class Divider extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string
  }

  static defaultProps = {
    label: "Available Options"
  }

  render() {
    const { classes: { container, item, label } } = this.props;
    return (
      <div className={container}>
        <hr className={item} />
        <Typography component="span" className={label}>{this.props.label}</Typography>
        <hr className={item} />
      </div>
    );
  }
}
