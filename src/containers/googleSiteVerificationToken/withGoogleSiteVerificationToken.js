import React from "react";
import { Query } from "react-apollo";
import hoistNonReactStatic from "hoist-non-react-statics";
import siteVerificationTokenQuery from "./googleSiteVerificationToken.gql";

/**
 * withGoogleSiteVerificationToken higher order query component for fetching Google site verification token
 * @name withGoogleSiteVerificationToken
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with Google site verification token as props
 */
export default function withGoogleSiteVerificationToken(Component) {
  class GoogleSiteVerification extends React.Component {
    render() {
      return (
        <Query query={siteVerificationTokenQuery}>
          {({ loading: loadingSiteVerificationToken, data }) => {
            const { siteVerificationToken } = data || {};
            return (
              <Component
                {...this.props}
                isLoading={loadingSiteVerificationToken}
                siteVerificationToken={siteVerificationToken}
              />
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(GoogleSiteVerification, Component);

  return GoogleSiteVerification;
}
