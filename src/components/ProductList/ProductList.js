import React from "react";
import Slider from "react-slick";
import Button from "../Button";
import * as s from "./style";
import { Hidden } from "@material-ui/core";

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
    image: "../../static/images/home/prod2.png",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod3.jpg",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod4.jpg",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod5.jpg",
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
    image: "../../static/images/home/prod2.png",
    price: 100,
    description: "Lorem ipsum"
  },
  {
    name: "Produto Teste",
    subName: "subteste",
    image: "../../static/images/home/prod3.jpg",
    price: 100,
    description: "Lorem ipsum"
  }
];

const productsInLine = 4;

const ProductList = () => {
  return (
    <s.Section desktopMode>
      <s.Header>
        <s.Title>Lorem Ipsum</s.Title>
        <s.SectionDescription>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </s.SectionDescription>
      </s.Header>

      <Hidden mdUp>
        <div>
          <Slider {...settings}>
            {products &&
              products.length &&
              products.map((prod, idx) => {
                return (
                  <div>
                    <s.Product className="product-item" key={idx}>
                      <s.ImageContainer src={prod.image}>
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
      </Hidden>

      <Hidden smDown>
        <s.DesktopContainerList>
          {products &&
            products.length &&
            products.map((prod, idx) => {
              const breakline = idx % productsInLine === 0;
              return (
                <div>
                  {breakline && <s.BreakLine />}
                  <s.DesktopProduct>
                    <s.ImageContainer src={prod.image} desktopMode>
                      <s.ButtonContainer>
                        <Button primary customStyles={{ height: "41px", width: "101px", fontSize: "16px" }}>
                          Comprar
                        </Button>
                      </s.ButtonContainer>
                    </s.ImageContainer>
                    <s.Description desktopMode>
                      <s.ProductName>{prod.name}</s.ProductName>
                      <s.ProductPrice>{`$ ${prod.price}`}</s.ProductPrice>
                      <s.ProductInnerDescription desktopMode>{prod.description}</s.ProductInnerDescription>
                    </s.Description>
                  </s.DesktopProduct>
                </div>
              );
            })}
        </s.DesktopContainerList>
      </Hidden>
    </s.Section>
  );
};

export default ProductList;
