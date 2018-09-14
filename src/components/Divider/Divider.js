import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => theme.Divider;

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
