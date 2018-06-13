import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { Query } from "react-apollo";
import tagsQuery from "./tags.gql";

/**
 * withTag higher order query component for fetching tag information
 * @name WithTag
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `tag` prop
 */
export default (Component) => (
  @inject("primaryShopId")
  class WithTag extends React.Component {
    static propTypes = {
      /**
       * ShopId used to obtain tags for
       */
      primaryShopId: PropTypes.string.isRequired
    }

    render() {
      const { primaryShopId } = this.props;

      return (
        <Query query={tagsQuery} variables={{ shopId: primaryShopId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            if (!data) return null;

            return (
              <Component
                {...this.props}
                tags={data.tags}
              />
            );
          }}
        </Query>
      );
    }
  }
);
