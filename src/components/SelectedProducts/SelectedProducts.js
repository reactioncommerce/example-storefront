import React from "react";
import Slider from "react-slick";
import { Hidden } from "@material-ui/core";
import * as s from "./style";

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

const mobileSettings = {
  infinite: false,
  slidesToShow: 2.5,
  arrows: false,
  variableWidth: true,
  swipeToSlide: true,
  afterChange: (index) => {
    console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
  }
};

const desktopSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true
};

const ProductList = () => {
  return (
    <div>
      <Hidden mdUp>
        <s.MobileSection>
          <s.Header>
            <s.Title>Lorem Ipsum</s.Title>
            <s.SectionDescription>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </s.SectionDescription>
          </s.Header>
          <div>
            <Slider {...mobileSettings}>
              {products &&
                products.length &&
                products.map((prod, idx) => {
                  return (
                    <div>
                      <s.Product className="product-item" key={idx}>
                        <s.ImageContainer src={prod.image} />
                      </s.Product>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </s.MobileSection>
      </Hidden>

      <Hidden smDown>
        <s.DesktopSection>
          <s.Header>
            <s.Title>Lorem Ipsum</s.Title>
            <s.SectionDescription>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </s.SectionDescription>
          </s.Header>
          <s.SliderContainer>
            <Slider {...desktopSettings}>
              {products &&
                products.length &&
                products.map((prod, idx) => {
                  return (
                    <s.Product className="product-item" desktopMode key={idx}>
                      <s.ImageContainer desktopMode src={prod.image} />
                    </s.Product>
                  );
                })}
            </Slider>
          </s.SliderContainer>
        </s.DesktopSection>
      </Hidden>
    </div>
  );
};

export default ProductList;
