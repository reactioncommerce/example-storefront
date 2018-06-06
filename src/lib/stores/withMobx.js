import React from "react";
import { Provider } from "mobx-react";
import rootMobxStores from "./index";

/**
 *
 * @param {Node} Component - The component to wrap
 * @returns {Node} - The wrapped component with Mobx stores add the react context.
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
