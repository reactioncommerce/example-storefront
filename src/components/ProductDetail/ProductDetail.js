import React from "react";
import PropTypes from "prop-types";
import ProductGallery from "components/ProductGallery";
import Accordion from "components/Accordion";
import { inject, observer } from "mobx-react";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import { Container, Col, Row, Visible } from "react-grid-system";
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
  return (
    <s.StyledContainer fluid>

      <Visible sm xs>
        <Row direction="column" align="center" justify="center">
          <ProductGallery product={product} />
          <s.Title>{product.title}</s.Title>
          <s.Price>de R$ <span>{product.pricing[0].maxPrice}</span></s.Price>
          <s.SpecialPrice>por <s.Span>{product.pricing[0].minPrice}</s.Span> à vista</s.SpecialPrice>
          <s.Button primary>COMPRAR</s.Button>
          <s.Button secondary>ADICIONAR AO CARRINHO</s.Button>
          <Accordion array={productInfo}/>
        </Row>
      </Visible>
      <Visible md lg xl>
        <Container style={{ background: "#fff" }}>
            <Col style={{ padding: "40px" }} md={6}>
              <ProductGallery product={product} />
            </Col >
            <s.StyledCol style={{ padding: "40px" }}>
              <s.StyledRow direction="column" align="center" justify="center">
                <s.Title>{product.title}</s.Title>
                <s.Price>de R$ <span>{product.pricing[0].maxPrice}</span></s.Price>
                <s.SpecialPrice>por <s.Span>{product.pricing[0].minPrice}</s.Span> à vista</s.SpecialPrice>
                <s.Button primary>COMPRAR</s.Button>
                <s.Button secondary>ADICIONAR AO CARRINHO</s.Button>
              </s.StyledRow>

            </s.StyledCol>
          <Row>
            <Accordion array={productInfo}/>
          </Row>
        </Container>
      </Visible>

    </s.StyledContainer>
  );
}));

ProductDetail.proptype = {
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default ProductDetail;
