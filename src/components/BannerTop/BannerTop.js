import React from "react";
import { Container, Row, Col, Visible } from "react-grid-system";
import PropTypes from "prop-types";
import * as s from "./style";

const BannerTop = (props) => {
  const { banner, webBanner } = props;

  return (
    <s.Banner>
      <Visible xs sm>
        <s.Image src={banner}/>
      </Visible>
      <Visible md lg xl>
        <s.Image src={webBanner}/>
      </Visible>

    </s.Banner>
  );
};

BannerTop.propTypes = {
  banner: PropTypes.string
};

export default BannerTop;
