import React from 'react';
import Button from "@reactioncommerce/components/Button/v1"

  class UnboxPayBoleto extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isReady: true};
  }
  render() {
    return (
      <div>
        <Button isDisabled={!this.state.isReady} onClick={() => { this.props.onSubmit(); }}>Submit</Button>
      </div>
    );
  }
}

export default UnboxPayBoleto;
