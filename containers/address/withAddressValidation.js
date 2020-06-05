import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import useAddressValidation from "hooks/address/useAddressValidation";

/**
 * @summary HOC for adding address validation
 * @param {React.Component} Component React component to wrap
 * @returns {React.Component} Higher order component
 */
export default function withAddressValidation(Component) {
  function WithAddressValidation(props) { // eslint-disable-line require-jsdoc
    const [addressValidation, addressValidationResults] = useAddressValidation();

    return (
      <Component
        {...props}
        addressValidation={addressValidation}
        addressValidationResults={addressValidationResults}
      />
    );
  }

  hoistNonReactStatic(WithAddressValidation, Component);

  return WithAddressValidation;
}
