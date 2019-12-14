import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-grid-system";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import * as s from "./style";


const CartItems = (props) => {
  const {
    items
    // isMiniCart,
    // isReadOnly,
    // hasMoreCartItems,
    // onLoadMoreCartItems
  } = props;

  const onChangeCartItemQuantity = (quantity, _id) => {};
  const onRemoveItemFromCart = (_id) => {};

  return (
    <Container>
      <Row component="li">
        <s.StyledCol xs={3}>
          <s.Span>Calcule o frete e o prazo</s.Span>
        </s.StyledCol>
        <Col xs={7}>
          <FormControl>
            <InputLabel htmlFor="cep">CEP</InputLabel>
            <Input id="cep"/>
          </FormControl>
          <span>Não sei meu CEP</span>
        </Col>
        <s.StyledCol xs={2}>
          <s.Button>OK</s.Button>
        </s.StyledCol>
      </Row>
    </Container>

  );
};

CartItems.propTypes = {
  classes: PropTypes.object,
  hasMoreCartItems: PropTypes.bool,
  isMiniCart: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.object),
    currencyQuantity: PropTypes.number,
    imageUrl: PropTypes.string,
    isLowInventoryQuantity: PropTypes.bool,
    price: PropTypes.shape({
      displayPrice: PropTypes.string,
      compareAtPrice: PropTypes.string
    }),
    productSlug: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.number
  })).isRequired,
  onChangeCartItemQuantity: PropTypes.func.isRequired,
  onLoadMoreCartItems: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func.isRequired,
  productURLPath: PropTypes.string
};

export default CartItems;
