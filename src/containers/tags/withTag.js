import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import tagQuery from "./tag.gql";

/**
 * withTag higher order query component for fetching tag information
 * @name WithTag
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `tag` prop
 */
export default (Component) => (
  @observer
  class WithTag extends React.Component {
    static propTypes = {
      /**
       * slug used to obtain tag info
       */
      routingStore: PropTypes.object.isRequired
    }
    @observable _data = {}

    @computed get data() { return toJS(this._data); }
    set data(value) { this._data = value; }

    render() {
      const { routingStore: { query: { slug: tag } } } = this.props;

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
