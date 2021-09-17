import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import useStores from "hooks/useStores";
import Login from "../Entry/Login";
import SignUp from "../Entry/SignUp";
import ChangePassword from "../Entry/ChangePassword";
import ForgotPassword from "../Entry/ForgotPassword";
import ResetPassword from "../Entry/ResetPassword";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 380,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const EntryModal = ({ onClose, resetToken }) => {
  const classes = useStyles();
  const { uiStore } = useStores();

  const { entryModal, setEntryModal } = uiStore;

  const openModal = (value) => {
    setEntryModal(value);
  };

  const closeModal = () => {
    setEntryModal(null);
    onClose();
  };

  // eslint-disable-next-line react/no-multi-comp
  const getModalComponent = () => {
    let comp = Login;
    if (entryModal === "signup") {
      comp = SignUp;
    } else if (entryModal === "change-password") {
      comp = ChangePassword;
    } else if (entryModal === "forgot-password") {
      comp = ForgotPassword;
    } else if (entryModal === "reset-password") {
      comp = ResetPassword;
    }
    return React.createElement(comp, { closeModal, openModal, resetToken });
  };

  return (
    <Modal open={Boolean(entryModal)} onClose={closeModal} aria-labelledby="entry-modal" aria-describedby="entry-modal">
      <div className={classes.paper}>{getModalComponent()}</div>
    </Modal>
  );
};

EntryModal.propTypes = {
  onClose: PropTypes.func,
  resetToken: PropTypes.string
};

EntryModal.defaultProps = {
  onClose: () => null
};

export default EntryModal;
