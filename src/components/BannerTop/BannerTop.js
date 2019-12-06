import React from "react";
import PropTypes from "prop-types";
import * as s from "./style";

const BannerTop = (props) => {
  const { banner } = props;

  return (
    <s.Banner>
      <s.Image src={banner}/>
    </s.Banner>
  );
};

BannerTop.propTypes = {
  banner: PropTypes.string
};

export default BannerTop;
