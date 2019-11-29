import React from "react";
import Slider from "react-slick";
// import Button from "../Button";
import * as s from "./style";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  afterChange: (index) => {
    console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
  }
};

const products = [
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod1.png",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod2.png",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod1.png",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod1.png",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod1.png",
    price: 100,
    description: "Lorem ipsum"
  }
];

const MainCarousel = () => {
  return (
    <s.Section>
      {/* <s.Header>
        <s.Title>Lorem Ipsum</s.Title>
        <s.SectionDescription>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </s.SectionDescription>
      </s.Header> */}

      <div>
        <Slider {...settings}>
          {products &&
            products.length &&
            products.map((prod, idx) => {
              return (
                <div>
                  <s.Product className="carousel-image-item" key={idx}>
                    <s.ImageContainer src={prod.image} />
                  </s.Product>
                </div>
              );
            })}
        </Slider>
      </div>
    </s.Section>
  );
};

export default MainCarousel;
