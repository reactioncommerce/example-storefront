import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_VIEWER = gql`
  {
    viewer {
      name
      emailRecords {
        address
      }
    }
  }
`;

class Profile extends Component {
  static propTypes = {
    viewer: PropTypes.object
  }

  render() {
    const { viewer: { name } } = this.props;
    return (
      <h1>Hello {name}</h1>
    );
  }
}

export default () => (
  <Query query={GET_VIEWER}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      const { viewer } = data;
      return (
        <Profile viewer={viewer} />
      );
    }}
  </Query>
);
