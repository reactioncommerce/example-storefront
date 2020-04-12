import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatic from "hoist-non-react-statics";
import inject from "hocs/inject";
import { validateAddress } from "./query.gql";

/**
 * @summary HOC for adding address validation
 * @param {React.Component} Comp React component to wrap
 * @returns {React.Component} Higher order component
 */
export default function withAddressValidation(Comp) {
  class WithAddressValidation extends Component {
    static propTypes = {
      client: PropTypes.shape({
        query: PropTypes.func.isRequired
      }),
      primaryShopId: PropTypes.string.isRequired
    };

    state = {
      submittedAddress: null,
      suggestedAddresses: [],
      validationErrors: []
    };

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    set addressValidationResults({ submittedAddress, validationResults: { suggestedAddresses, validationErrors } }) {
      if (this._isMounted) {
        this.setState({
          suggestedAddresses: suggestedAddresses.map(this.xformValidSuggestions),
          submittedAddress,
          validationErrors
        });
      }
    }

    xformValidSuggestions = (address) => ({
      ...address,
      isValid: true
    });

    handleAddressValidation = async (address) => {
      const { client: apolloClient, primaryShopId: shopId } = this.props;
      const { data: results } = await apolloClient.query({
        query: validateAddress,
        variables: {
          address,
          shopId
        }
      });
      this.addressValidationResults = {
        submittedAddress: address,
        validationResults: results.addressValidation
      };
    };

    render() {
      return (
        <Fragment>
          <Comp
            {...this.props}
            addressValidation={this.handleAddressValidation}
            addressValidationResults={{ ...this.state }}
          />
        </Fragment>
      );
    }
  }

  hoistNonReactStatic(WithAddressValidation, Comp);

  return inject("primaryShopId")(WithAddressValidation);
}
