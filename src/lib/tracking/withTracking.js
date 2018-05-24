import React from "react";
import track from "./track";
import dispatch from "./dispatch";

/**
 * withTracking higher order component for sending tracking data to centralized dispatch method
 * @name withTracking
 * @param {React.Component} Component to decorate and return
 * @returns {React.Component} - Decorated component
 */
export default (Component) => (
  @track({}, { dispatch })
  class withTracking extends React.Component {
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
);
