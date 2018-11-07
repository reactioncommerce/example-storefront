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

    handleAddressValidation = async (address) => {
      const { client: apolloClient, primaryShopId: shopId } = this.props;
      const addressValidationResults = await apolloClient.query({
        query: validateAddress,
        variables: {
          address,
          shopId
        }
      });
      console.log("validating addreses!", address, shopId, addressValidationResults);
    };

    render() {
      return (
        <Fragment>
          <Comp {...this.props} addressValidation={this.handleAddressValidation} />
        </Fragment>
      );
    }
  }

  hoistNonReactStatic(WithAddressValidation, Comp);

  return WithAddressValidation;
}
