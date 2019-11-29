import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import * as s from "./style";

const BannerTop = (props) => {
  return (
    <s.Banner>
      <s.Image src={props.banner}/>
    </s.Banner>
  );
};

BannerTop.propTypes = {

};

export default BannerTop;
