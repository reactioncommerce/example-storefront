import React from "react";
import { Provider } from "mobx-react";
import rootMobxStores from "./index";

/**
 *
 * @param {Node} Component - -the component to wrap
 * @returns {Node} - wrapped component
 */
function withMobx(Component) {
  class WithMobx extends React.Component {
    render() {
      return (
        <Provider {...rootMobxStores} >
          <Component {...this.props}/>
        </Provider>
      );
    }
  }

  return WithMobx;
}

export default withMobx;
