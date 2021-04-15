import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";

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
  }
}));

/**
 *
 * @param {Object} props of the structure { closeModal: function called to close the modal }
 * @returns {Object} the component to render for updating password
 */
export default function ChangePassword(props) {
  const { closeModal } = props;
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { passwordClient } = getAccountsHandler();

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangePassword = async () => {
    try {
      await passwordClient.changePassword(hashPassword(oldPassword), hashPassword(newPassword));
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form className={classes.root} noValidate>
      <h1>Change password</h1>
      <FormControl>
        <InputLabel htmlFor="old-password">Old Password</InputLabel>
        <Input id="old-password" aria-describedby="old-password" onChange={handleOldPasswordChange} value={oldPassword}
          type="password"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="new-password">New Password</InputLabel>
        <Input id="new-password" aria-describedby="new-password" onChange={handleNewPasswordChange} value={newPassword}
          type="password"
        />
      </FormControl>
      {!!error && <div className={classes.error}>{error}</div>}
      <Button className={classes.resetButton} onClick={handleChangePassword} color="primary" variant="contained"
        tabIndex="0" role="button"
      >Change</Button>
    </form>
  );
}

ChangePassword.propTypes = {
  closeModal: PropTypes.func
};
