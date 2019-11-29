import React from "react";
import Slider from "react-slick";
import Button from "../../components/Button";
import * as s from "./style";

const settings = {
  infinite: false,
  slidesToShow: 2.5,
  arrows: false,
  variableWidth: true,
  swipeToSlide: true,
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
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod1.png",
    price: 100,
    description: "Lorem ipsum"
  }
];

const ProductList = () => {
  return (
    <s.Section>
      <s.Header>
        <s.Title>Lorem Ipsum</s.Title>
        <s.SectionDescription>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </s.SectionDescription>
      </s.Header>

      <div>
        <Slider {...settings}>
          {products &&
            products.length &&
            products.map((prod, idx) => {
              return (
                <div>
                  <s.Product key={idx}>
                    <s.ImageContainer>
                      <s.Image src={prod.image} />
                      <s.ButtonContainer>
                        <Button primary>Comprar</Button>
                      </s.ButtonContainer>
                    </s.ImageContainer>
                    <s.Description>
                      <s.ProductName>{prod.name}</s.ProductName>
                      <s.ProductPrice>{`$ ${prod.price}`}</s.ProductPrice>
                      <s.ProductInnerDescription>{prod.description}</s.ProductInnerDescription>
                    </s.Description>
                  </s.Product>
                </div>
              );
            })}
        </Slider>
      </div>
    </s.Section>
  );
};

export default ProductList;
