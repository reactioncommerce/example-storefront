import React from "react";
import Slider from "react-slick";
import { Row, Col, Hidden, Container } from "react-grid-system";

import * as s from "./style";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};


const infos = [
  {
    title: "Formas de Pagamento",
    subtitle: "Pagamento rápido e seguro com cartão de crédito ou boleto",
    image: "../../static/images/home/entrega1.png"
  },
  {
    title: "Entrega Express",
    subtitle: "Entrega garantida para todo o Brasil e Frete Express para regiões selecionadas",
    image: "../../static/images/home/entrega2.png"
  },
  {
    title: "Segurança Garantida",
    subtitle: "Ambiente de compra 100% seguro",
    image: "../../static/images/home/entrega3.png"
  }
];

const InfoCarousel = () => (
  <s.Section>
    <Col>
    <Hidden md lg xl>
      <Slider {...settings}>
        {infos &&
          infos.length &&
          infos.map((info, idx) => (
            <s.StyledSmCol sm={12}>
              <s.Info className="info-carousel-image-item" key={idx}>
                <s.ImageContainer src={info.image} />
                <s.InnerTitle> {info.title}</s.InnerTitle>
                <s.InnerSubTitle>{info.subtitle}</s.InnerSubTitle>
              </s.Info>
            </s.StyledSmCol>
          ))}
      </Slider >
    </Hidden>
    <Hidden xs sm>
      <Row>
        <s.StyledCol md={4}>
          <s.Info className="info-carousel-image-item">
            <s.ImageContainer src={infos[0].image} />
            <s.InnerTitle> {infos[0].title}</s.InnerTitle>
            <s.InnerSubTitle>{infos[0].subtitle}</s.InnerSubTitle>
          </s.Info>
        </s.StyledCol>
        <s.StyledCol md={4}>

          <s.Info className="info-carousel-image-item">
            <s.ImageContainer src={infos[1].image} />
            <s.InnerTitle> {infos[1].title}</s.InnerTitle>
            <s.InnerSubTitle>{infos[1].subtitle}</s.InnerSubTitle>
          </s.Info>
        </s.StyledCol>
        <s.StyledCol md={4}>
          <s.Info className="info-carousel-image-item">
            <s.ImageContainer src={infos[2].image} />
            <s.InnerTitle> {infos[2].title}</s.InnerTitle>
            <s.InnerSubTitle>{infos[2].subtitle}</s.InnerSubTitle>
          </s.Info>
        </s.StyledCol>

      </Row>
    </Hidden>
    </Col>
  </s.Section>
);

export default InfoCarousel;
