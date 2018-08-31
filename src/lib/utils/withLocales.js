// example HOC
import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 *
 * @name withLocales
 * @summary Imports locles.json and provides it to components via props
 * @param {Object} ComponentWithLocales - The component you want to provide locales
 * @return {Class} - React component with locles on props
 */
export default function withLocales(ComponentWithLocales) {
  class WithLocales extends Component {
    static propTypes = {
      forwardRef: PropTypes.func,
      locales: PropTypes.object
    };

    static defaultProps = {
      locales: {}
    };

    state = {
      locales: this.props.locales
    };

    async componentDidMount() {
      const { locales: currentLocales } = this.state;
      if (Object.keys(currentLocales).length === 0) {
        // eslint-disable-next-line
        await this.loadLocales().then((locales) => {
          this.setState({ locales });
        });
      }
    }

    async loadLocales() {
      let locales;
      try {
        locales = await import("./locales.json");
        delete locales.__webpackChunkName;
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
      return locales;
    }

    render() {
      const { locales } = this.state;
      return <ComponentWithLocales ref={this.props.forwardRef} {...this.props} locales={locales} />;
    }
  }

  return React.forwardRef((props, ref) => <WithLocales {...props} forwardRef={ref} />);
}
