import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({});

@withStyles(styles)
class privacyPolicy extends Component {
  render() {
    return (
      <Fragment>
        <section>
          <Typography variant="title">Ochrana osobných údajov</Typography>
          <Typography variant="body">Example dale citaj</Typography>
        </section>
      </Fragment>
    );
  }
}

export default privacyPolicy;
