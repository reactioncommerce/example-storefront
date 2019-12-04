import React from "react";
import Slider from "react-slick";
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

const InfoCarousel = () => {
  return (
    <s.Section>
      <div>
        <Slider {...settings}>
          {infos &&
            infos.length &&
            infos.map((info, idx) => {
              return (
                <div>
                  <s.Info className="info-carousel-image-item" key={idx}>
                    <s.ImageContainer src={info.image} />
                    <s.InnerTitle> {info.title}</s.InnerTitle>
                    <s.InnerSubTitle>{info.subtitle}</s.InnerSubTitle>
                  </s.Info>
                </div>
              );
            })}
        </Slider>
      </div>
    </s.Section>
  );
};

export default InfoCarousel;
