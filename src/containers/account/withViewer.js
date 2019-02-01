import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { inject, observer } from "mobx-react";
import hoistNonReactStatic from "hoist-non-react-statics";
import viewerQuery from "./viewer.gql";

/**
 * withViewer higher order query component for getting the current viewer account
 * @name WithViewer
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `viewer` prop
 */
export default function withViewer(Component) {
  @inject("authStore")
  @observer
  class WithViewer extends React.Component {
    static propTypes = {
      authStore: PropTypes.shape({
        setAccount: PropTypes.func
      })
    }

    render() {
      const { authStore } = this.props;

      return (
        <Query errorPolicy="all" query={viewerQuery}>
          {({ data }) => {
            if (data) {
              authStore.setAccount(data.viewer);
            }

            return (
              <Component
                {...this.props}
                viewer={data && data.viewer}
              />
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithViewer, Component);

  return WithViewer;
}
