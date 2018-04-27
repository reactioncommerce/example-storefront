import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

export default class ProductGrid extends Component {
  static propTypes = {
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    })
  };

  render() {
    const { pageInfo } = this.props;

    return (
      <div>
        {pageInfo.hasPreviousPage &&
          <Button onClick={pageInfo.loadPreviousPage}>Previous</Button>
        }
        {pageInfo.hasNextPage &&
          <Button onClick={pageInfo.loadNextPage}>Next</Button>
        }
      </div>
    );
  }
}
