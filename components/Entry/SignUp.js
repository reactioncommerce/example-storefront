import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import useViewer from "hooks/viewer/useViewer";

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
  switchEntryMode: {
    textAlign: "center",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  error: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: red[500],
    fontSize: "1.1em",
    textAlign: "center"
  },
  signUpButton: {
    marginTop: theme.spacing(4)
  }
}));

/**
 * Component to render when user tries to signup.
 * @param {Object} props of structure { closeModal: func, openModal: func }
 * @returns {Object} jsx
 */
export default function SignUp(props) {
  const { closeModal, openModal } = props;
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, , refetch] = useViewer();
  const { passwordClient } = getAccountsHandler();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOpenLogIn = () => {
    openModal("login");
  };

  const registerUser = async () => {
    try {
      // Creating user will login also
      await passwordClient.createUser({ email, password: hashPassword(password) });
      closeModal();
      await refetch();
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form className={classes.root} noValidate>
      <h1>Create your account</h1>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" aria-describedby="email-address" onChange={handleEmailChange} value={email}
          type="email"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          aria-describedby="password"
          onChange={handlePasswordChange}
          value={password}
          type="password"
        />
      </FormControl>
      <Button
        onClick={registerUser}
        color="primary"
        variant="contained"
        className={classes.signUpButton}
        tabIndex="0"
        role="button"
      >
        Sign Up
      </Button>
      {!!error && <div className={classes.error}>{error}</div>}
      <div
        className={classes.switchEntryMode}
        onClick={handleOpenLogIn}
        onKeyDown={handleOpenLogIn}
        role="button"
        tabIndex={0}
      >
        Already have an account? Log In
      </div>
    </form>
  );
}

SignUp.propTypes = {
  closeModal: PropTypes.func,
  openModal: PropTypes.func
};
