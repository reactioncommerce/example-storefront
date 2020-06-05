import React from "react";
import PropTypes from "prop-types";
import locales from "./locales.json";

/**
 *
 * @name withLocales
 * @summary Imports locales.json and provides it to components via props
 * @param {Object} ComponentWithLocales - The component you want to provide locales
 * @return {Class} - React component with locales on props
 */
export default function withLocales(ComponentWithLocales) {
  function WithLocales(props) { // eslint-disable-line require-jsdoc
    return <ComponentWithLocales ref={props.forwardRef} {...props} locales={locales} />;
  }

  WithLocales.propTypes = {
    forwardRef: PropTypes.func,
    locales: PropTypes.object
  };

  WithLocales.defaultProps = {
    locales: {}
  };

  // eslint-disable-next-line react/no-multi-comp, react/display-name
  return React.forwardRef((props, ref) => <WithLocales {...props} forwardRef={ref} />);
}
