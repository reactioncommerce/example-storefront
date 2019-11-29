import React from "react";
import Carousel from "./../Carousel/index";
import * as styles from "./style";


const About = (props) => {
  const { page } = props;

  return (
    <styles.AboutSection>
      <styles.Title>{page.title}</styles.Title>
      <styles.Description>{page.description}</styles.Description>
      <Carousel slider={page.slider}/>
    </styles.AboutSection>
  );
};


export default About;
