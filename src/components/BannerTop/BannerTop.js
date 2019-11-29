import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import * as styles from "./style";

const BannerTop = (props) => {
  return (
    <styles.Banner>
      <styles.Image src={props.banner}/>
    </styles.Banner>
  );
};

BannerTop.propTypes = {

};

export default BannerTop;
