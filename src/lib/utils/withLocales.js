import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

/**
 *
 * @name withLocales
 * @summary Imports locales.json and provides it to components via props
 * @param {Object} ComponentWithLocales - The component you want to provide locales
 * @return {Class} - React component with locales on props
 */
export default function withLocales(ComponentWithLocales) {
  @inject("uiStore")
  @observer
  class WithLocales extends Component {
    static propTypes = {
      forwardRef: PropTypes.func,
      locales: PropTypes.object,
      uiStore: PropTypes.object
    };

    static defaultProps = {
      locales: {}
    };

    async componentDidMount() {
      const { uiStore } = this.props;
      const { locales: currentLocales } = uiStore;
      if (Object.keys(currentLocales).length === 0) {
        // eslint-disable-next-line
        await this.loadLocales().then((locales) => {
          uiStore.setLocales(locales);
        });
      }
    }

    async loadLocales() {
      let locales;
      try {
        locales = await import("/static/data/locales.json");
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
      return locales.default;
    }

    render() {
      const { uiStore } = this.props;
      const { locales } = uiStore;
      return <ComponentWithLocales ref={this.props.forwardRef} {...this.props} locales={locales} />;
    }
  }

  return React.forwardRef((props, ref) => <WithLocales {...props} forwardRef={ref} />);
}
