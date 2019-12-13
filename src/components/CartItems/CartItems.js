import React from "react";
import PropTypes from "prop-types";
import { Container, Col } from "react-grid-system";
import * as s from "./style";


const CartItems = (props) => {
  const {
    items
  } = props;

  const onChangeCartItemQuantity = (quantity, _id) => {};
  const onRemoveItemFromCart = (_id) => {};

  return (
    <Container component="ul">
      {items.map((product) => (
        <s.StyledRow component="li">
          <Col xs={3}>
            <s.ImageBox>
              <s.Image src={product.photo} alt=""/>
            </s.ImageBox>
          </Col>
          <s.StyledCol xs={6}>
            <s.Title>{product.title}</s.Title>
            <s.Variant>{product.variantTitle}</s.Variant>
            <s.QuantityCounter>
              <s.CounterButton>-</s.CounterButton>
              <s.Quantity>{product.quantity}</s.Quantity>
              <s.CounterButton>+</s.CounterButton>
            </s.QuantityCounter>
          </s.StyledCol>
          <s.StyledCol xs={3}>
            <s.Controls>
              <s.Button>X</s.Button>
              <s.Price>${product.total}</s.Price>
            </s.Controls>
          </s.StyledCol>
        </s.StyledRow>
      ))}
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
