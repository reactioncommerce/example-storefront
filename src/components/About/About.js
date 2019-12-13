import React from "react"; 
import Carousel from "./../Carousel/index";
import MainCarousel from "/components/MainCarousel";
import { Row, Col, Container, Visible } from "react-grid-system";
import * as s from "./style";


const About = (props) => {
  const { page } = props;

  return (

    <s.AboutSection>
      <Visible xs sm>
        <Carousel slider={page.slider}/>
      </Visible>
      <Visible md lg xl>
        <Container>
          <Row>
            <s.PageTitle>Lorem Ipsum</s.PageTitle>
            <s.PageSubtitle>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </s.PageSubtitle>
          </Row>
          <Row>
            <Col md={4}>
              <s.ItemImage src="/static/images/brand-image.png" alt=""/>
              <s.ItemTitle>Testando Textos</s.ItemTitle>
              <s.ItemDescription>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo</s.ItemDescription>
            </Col>
            <Col md={4}>
              <s.ItemImage src="/static/images/brand-image.png" alt=""/>
              <s.ItemTitle>Com Titulos Diferentes</s.ItemTitle>
              <s.ItemDescription>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo</s.ItemDescription>
            </Col>
            <Col md={4}>
              <s.ItemImage src="/static/images/brand-image.png" alt=""/>
              <s.ItemTitle>Para Ficar Bonitinho</s.ItemTitle>
              <s.ItemDescription>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo</s.ItemDescription>
            </Col>
          </Row>
        </Container>
      </Visible>
    </s.AboutSection>
  );
};


export default About;
