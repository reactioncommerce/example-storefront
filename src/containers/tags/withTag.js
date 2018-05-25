import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import tagQuery from "./tag.gql";

/**
 * withTag higher order query component for fetching tag information
 * @name WithTag
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `tag` prop
 */
export default (Component) => (
  class WithTag extends React.Component {
    static propTypes = {
      /**
       * slug used to obtain tag info
       */
      url: PropTypes.object.isRequired
    }

    render() {
      const { url: { query: { slug: tag } } } = this.props;

      return (
        <Query query={tagQuery} variables={{ slugOrId: tag }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            if (!data || !data.tag) return null;

            return (
              <Component
                {...this.props}
                tag={data.tag}
              />
            );
          }}
        </Query>
      );
    }
  }
);
