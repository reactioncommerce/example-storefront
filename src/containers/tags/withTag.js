import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import hoistNonReactStatic from "hoist-non-react-statics";
import tagQuery from "./tag.gql";

/**
 * withTag higher order query component for fetching tag information
 * @name WithTag
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `tag` prop
 */
export default function withTag(Component) {
  class WithTag extends React.Component {
    static propTypes = {
      /**
       * slug used to obtain tag info
       */
      router: PropTypes.object.isRequired
    }

    render() {
      const { router: { query: { slug: tag } } } = this.props;

      return (
        <Query query={tagQuery} variables={{ slugOrId: tag }}>
          {({ error, data }) => {
            if (error) return null;
            const tagData = data || {};

            return (
              <Component
                {...this.props}
                tag={tagData && tagData.tag}
              />
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithTag, Component);

  return WithTag;
}
