import React from "react";
import PropTypes from "prop-types";

import * as s from "./style";

/**
* Mount slider with dynamic slides.
* @param {array} slider Array with slides.
* @returns {component} the slider mounted.
*/
const mountSlider = (slider) => slider.map((slide) => (
  <s.Slide>
    <s.Image src={slide.photo} alt=""/>
    <s.SlideTitle>{slide.title}</s.SlideTitle>
    <s.SlideDescription>{slide.description}</s.SlideDescription>
  </s.Slide>
));

const Carousel = (props) => {
  const { slider } = props;
  return (
    <s.Carousel>
      <s.Slider>
        {mountSlider(slider)}
        <s.Controls>
          <s.ControlItem/>
        </s.Controls>
      </s.Slider>
    </s.Carousel>
  );
};

Carousel.propTypes = {
  slider: PropTypes.array
};

export default Carousel;
