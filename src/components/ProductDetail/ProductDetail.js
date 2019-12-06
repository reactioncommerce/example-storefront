import React from "react";
import PropTypes from "prop-types";
import ProductGallery from "components/ProductGallery";
import Accordion from "components/Accordion";
import { inject, observer } from "mobx-react";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import { Container, Col, Row, Hidden } from "react-grid-system";
import * as s from "./style";


const ProductDetail = inject()(observer((props) => {
  const { product } = props;
  const productInfo = [
    {
      title: "Informações sobre o Produto",
      text: product.description
    }, {
      title: "Ficha técnica",
      text: product.description
    }
  ];
  if (isWidthDown("sm")) {
    return (
      <Row direction="column" align="center" justify="center">
        <ProductGallery product={product} />
        <s.Title>{product.title}</s.Title>
        <s.Price>de R$ <span>{product.pricing[0].maxPrice}</span></s.Price>
        <s.SpecialPrice>por <s.Span>{product.pricing[0].minPrice}</s.Span> à vista</s.SpecialPrice>
        <s.Button primary>COMPRAR</s.Button>
        <s.Button secondary>ADICIONAR AO CARRINHO</s.Button>
        <Accordion array={productInfo}/>
      </Row>
    );
  }
  return (
    <Row direction="column" align="center" justify="center">
    </Row>
  );
}));

ProductDetail.proptype = {
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default ProductDetail;
