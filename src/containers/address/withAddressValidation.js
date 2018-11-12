import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatic from "hoist-non-react-statics";
import { withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import { validateAddress } from "./query.gql";

export default function withAddressValidation(Comp) {
  @withApollo
  @inject("primaryShopId")
  @observer
  class WithAddressValidation extends Component {
    static propTypes = {
      client: PropTypes.shape({
        query: PropTypes.func.isRequired
      }),
      /**
       * ShopId used to obtain tags for
       */
      primaryShopId: PropTypes.string.isRequired
    };

    state = {
      submittedAddress: null,
      suggestedAddresses: [],
      validationErrors: []
    };

    set addressValidationResults({ submittedAddress, validationResults }) {
      console.log("setting withAdressValidation state", validationResults, submittedAddress);
      this.setState({ submittedAddress, ...validationResults });
    }

    handleAddressValidation = async (address) => {
      const { client: apolloClient, primaryShopId: shopId } = this.props;
      const { data: results } = await apolloClient.query({
        query: validateAddress,
        variables: {
          address,
          shopId
        }
      });
      console.log("address validation results form GQL", results);
      this.addressValidationResults = {
        submittedAddress: address,
        validationResults: results.addressValidation
      };
    };

    render() {
      console.log("is this working?");
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

  return WithAddressValidation;
}
