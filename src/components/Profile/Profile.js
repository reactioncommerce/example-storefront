import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "material-ui/Typography";

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

export class Profile extends Component {
  static propTypes = {
    viewer: PropTypes.object
  }

  render() {
    const { viewer: { name } } = this.props;
    return (
      <Typography variant="subheading">Hello {name}</Typography>
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
