import React from "react";
import Carousel from "./../Carousel/index";
import * as s from "./style";


const About = (props) => {
  const { page } = props;

  return (
    <s.AboutSection>
      <Carousel slider={page.slider}/>
    </s.AboutSection>
  );
};


export default About;
