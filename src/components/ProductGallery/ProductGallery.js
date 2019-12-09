import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";
import withWidth from "@material-ui/core/withWidth";
import { Container, Col, Row, Visible } from "react-grid-system";
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
    <Row align="start" justify="start">
      <Visible sm xs>
        <s.StyledSlider {...settings}>
          { product.media.map((photo) => (
            <s.ImageCol>
              <s.Image src={photo} alt=""/>
            </s.ImageCol>
          )) }
        </s.StyledSlider>
      </Visible>
      <Visible md lg xl>
        <s.StyledSlider {...settings} customPaging={(index) => (<s.ControlBox><s.StyledControl alt="" src={product.media[index]}/></s.ControlBox>)}>
          { product.media.map((photo) => (
            <s.ImageCol>
              <s.Image src={photo} alt=""/>
            </s.ImageCol>
          )) }
        </s.StyledSlider>
      </Visible>

    </Row>
  );
}));

ProductGallery.proptype = {
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default withWidth()(ProductGallery);
