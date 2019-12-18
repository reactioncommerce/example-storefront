/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "/components/Button";
import FormControl from "@material-ui/core/FormControl";
import * as s from "./style";

const mock = {
  newsletter: {
    title: "Subscribe our newsletter",
    description: "Pellentesque habitant morbi tristique senectus et netus et",
    callToAction: "Subscribe"
  }
};
const Newsletter = (props) => {
  const { title, description, callToAction } = mock.newsletter;
  return (
    <s.Newsletter>
      <s.Title>{title}</s.Title>
      <s.Description>{description}</s.Description>
      <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">Your email</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <svg width="27" height="21" viewBox="0 0 30 24">
                <g transform="translate(-472 -2460)">
                  <path
                    fill="#4f4d4d"
                    d="M27,24H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0H27a3,3,0,0,1,3,3V21A3,3,0,0,1,27,24ZM3,6V21H27V6L15,13.5ZM3,3l12,7.5L27,3Z"
                    transform="translate(472 2460)"
                  />
                </g>
              </svg>
            </InputAdornment>
          }
        />
        <br/>
        <Button secondary>{callToAction}</Button>
      </FormControl>
    </s.Newsletter>
  );
};

Newsletter.propTypes = {
  callToAction: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string
};

export default Newsletter;
