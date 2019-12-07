import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { products } from "../../__mocks__/home/mainCarousel";
import * as s from "./style";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const MainCarousel = ({ fullPage }) => {
  return (
    <s.Section>
      <div>
        <Slider {...settings}>
          {products &&
            products.length &&
            products.map((prod, idx) => {
              return (
                <div>
                  <s.Product className="carousel-image-item" key={idx}>
                    <s.ImageContainer fullPage={fullPage} src={prod.image} />
                    <s.TextBlock>
                      <s.InnerTitle> Finibus Bonorum et Malorum</s.InnerTitle>
                      <s.InnerDescription>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                      </s.InnerDescription>
                    </s.TextBlock>
                  </s.Product>
                </div>
              );
            })}
        </Slider>
      </div>
    </s.Section>
  );
};

MainCarousel.propTypes = {
  fullPage: PropTypes.bool
};

MainCarousel.defaultProps = {
  fullPage: false
};

export default MainCarousel;
