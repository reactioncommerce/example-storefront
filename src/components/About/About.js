import React from "react";
import Carousel from "./../Carousel/index";
import * as s from "./style";


const About = (props) => {
  const { page } = props;

  return (
    <s.AboutSection>
      <s.Title>{page.title}</s.Title>
      <s.Description>{page.description}</s.Description>
      <Carousel slider={page.slider}/>
    </s.AboutSection>
  );
};


export default About;
