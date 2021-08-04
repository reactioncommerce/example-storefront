import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import { useRouter } from "next/router";

import getAccountsHandler from "../../lib/accountsServer.js";
import hashPassword from "../../lib/utils/hashPassword";

const useStyles = makeStyles((theme) => ({
  root: {
    "display": "flex",
    "flexDirection": "column",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  error: {
    marginTop: theme.spacing(2),
    color: red[500],
    fontSize: "1.1em",
    textAlign: "center"
  },
  resetButton: {
    marginTop: theme.spacing(4)
  },
  switchEntryMode: {
    textAlign: "center",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));


/**
 * Component to render when user wants to reset their password
 * @param {Object} props of structure { resetToken: string?, openModal: func }
 * @returns {Object} jsx
 */
export default function ResetPassword(props) {
  const { resetToken, openModal } = props;
  const router = useRouter();
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { passwordClient } = getAccountsHandler();

  const handleOpenForgotPassword = () => {
    openModal("forgot-password");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const resetPassword = async () => {
    try {
      await passwordClient.resetPassword(resetToken, hashPassword(password));
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form className={classes.root} noValidate>
      <h1>Choose a new password</h1>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" aria-describedby="password" onChange={handlePasswordChange} value={password}
          type="password"
        />
      </FormControl>
      {!!error && <div className={classes.error}>{error}</div>}
      <Button className={classes.resetButton} onClick={resetPassword} color="primary" variant="contained"
        tabIndex="0" role="button"
      >Reset Password</Button>
      <div className={classes.switchEntryMode} onClick={handleOpenForgotPassword} onKeyDown={handleOpenForgotPassword} role="button"
        tabIndex={0}
      >Send reset link again</div>
    </form>
  );
}

ResetPassword.propTypes = {
  openModal: PropTypes.func,
  resetToken: PropTypes.string
};
