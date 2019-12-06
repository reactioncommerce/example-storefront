import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";
import { Container, Col, Row } from "react-grid-system";
import * as s from "./style";


const ProductGallery = inject()(observer((props) => {
  const { product } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <s.StyledSlider {...settings}>
      { product.media.map((photo) => (
        <s.ImageCol>
          <s.Image src={photo} alt=""/>
        </s.ImageCol>
      )) }
    </s.StyledSlider>
  );
}));

ProductGallery.proptype = {
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default ProductGallery;
