import React, { useEffect } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Router } from "routes";
import { Hidden } from "@material-ui/core";
import Button from "../Button";
import * as s from "./style";

const settings = {
  infinite: false,
  slidesToShow: 2.5,
  arrows: false,
  variableWidth: true,
  swipeToSlide: true
};

const productsInLine = 4;

const ProductList = ({ catalogItems, isLoadingCatalogItems }) => {
  const onClickProduct = (slug) => {
    Router.pushRoute(`/product/${slug}`);
  };

  if (isLoadingCatalogItems) return <span>Carregando...</span>;

  const products = (catalogItems || []).map((item) => item.node.product);

  if (products.length === 0) return <span>Nenhum produto encontrado...</span>;

  return (
    <s.Section>
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
            {products.length &&
              products.map((prod) => {
                const image = prod.primaryImage && prod.primaryImage.URLs && prod.primaryImage.URLs.small;
                return (
                  <s.Product className="product-item" key={prod._id} onClick={() => onClickProduct(prod.slug)}>
                    <s.ImageContainer hasImage={!!image} src={image}>
                      <s.ButtonContainer>
                        <Button primary onClick={() => onClickProduct(prod.slug)}>
                          Comprar
                        </Button>
                      </s.ButtonContainer>
                    </s.ImageContainer>
                    <s.Description>
                      <s.ProductName>{prod.title}</s.ProductName>
                      <s.ProductPrice>{prod.pricing && prod.pricing[0].displayPrice}</s.ProductPrice>
                    </s.Description>
                  </s.Product>
                );
              })}
          </Slider>
        </div>
      </Hidden>

      <Hidden smDown>
        <s.DesktopContainerList>
          {products.length &&
            products.map((prod, idx) => {
              const breakline = idx % productsInLine === 0;
              const image = prod.primaryImage && prod.primaryImage.URLs && prod.primaryImage.URLs.medium;
              return (
                <div key={prod._id}>
                  {breakline && <s.BreakLine />}
                  <s.DesktopProduct onClick={() => onClickProduct(prod.slug)}>
                    <s.ImageContainer hasImage={!!image} src={image} desktopMode>
                      <s.ButtonContainer>
                        <Button
                          primary
                          customStyles={{ height: "41px", width: "101px", fontSize: "16px" }}
                          onClick={() => onClickProduct(prod.slug)}
                        >
                          Comprar
                        </Button>
                      </s.ButtonContainer>
                    </s.ImageContainer>
                    <s.Description desktopMode>
                      <s.ProductName>{prod.title}</s.ProductName>
                      <s.ProductPrice>{prod.pricing && prod.pricing[0].displayPrice}</s.ProductPrice>
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

ProductList.propTypes = {
  catalogItems: PropTypes.array,
  catalogItemsPageInfo: PropTypes.object,
  isLoadingCatalogItems: PropTypes.bool
};

export default ProductList;
