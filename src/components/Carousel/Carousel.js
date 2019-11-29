import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import * as s from "./style";

const Carousel = (props) => {
  const { slider } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) =>  (
      <s.ControlItem  />
    )
  };

  return (
    <s.Carousel>
      <Slider {...settings}>
        { slider.map((slide, index) => (
          <s.Slide key={index}>
            <s.Image src={slide.photo} alt=""/>
            <s.SlideTitle>{slide.title}</s.SlideTitle>
            <s.SlideDescription>{slide.description}</s.SlideDescription>
          </s.Slide>
        )) }
      </Slider>
    </s.Carousel>
  );
};

Carousel.propTypes = {
  slider: PropTypes.array
};

export default Carousel;
