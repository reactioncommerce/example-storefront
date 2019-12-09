import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import withWidth from "@material-ui/core/withWidth";
import { Container, Col, Row, Visible } from "react-grid-system";
import * as s from "./style";

const ProductGallery = inject()(
  observer(({ images }) => {
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
            {images &&
              images.map((img) => (
                <s.ImageCol key={img.productId}>
                  <s.Image src={img.URLs.medium} alt="" />
                </s.ImageCol>
              ))}
          </s.StyledSlider>
        </Visible>
        <Visible md lg xl>
          <s.StyledSlider
            {...settings}
            customPaging={(index) => (
              <s.ControlBox>
                <s.StyledControl alt="" src={images[index].URLs.medium} />
              </s.ControlBox>
            )}
          >
            {images &&
              images.map((img) => (
                <s.ImageCol key={img.productId}>
                  <s.Image src={img.URLs.medium} alt="" />
                </s.ImageCol>
              ))}
          </s.StyledSlider>
        </Visible>
      </Row>
    );
  })
);

ProductGallery.proptype = {
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  }),
  images: PropTypes.array
};

export default withWidth()(ProductGallery);
