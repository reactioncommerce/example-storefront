import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Visible } from "react-grid-system";
import { FormControl, Input, InputLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import * as s from "./style";


const CartItems = (props) => {
  const { items } = props;

  const onChangeCartItemQuantity = (quantity, _id) => {};
  const onRemoveItemFromCart = (_id) => {};

  return (
    <Container>
      {/* <Visible xs sm> */}
      <s.StyledRow component="li">
        <s.StyledCol xs={3}>
          <s.Span>Calcule o frete e o prazo</s.Span>
        </s.StyledCol>
        <s.StyledCol xs={7}>
          <FormControl>
            <InputLabel htmlFor="cep">CEP</InputLabel>
            <Input id="cep"/>
          </FormControl>
          <s.Span>Não sei meu CEP</s.Span>
        </s.StyledCol>
        <s.StyledCol xs={2}>
          <s.Button>OK</s.Button>
        </s.StyledCol>
        <s.StyledCol align="center" justify="start" xs={4}>
          <FormControl component="fieldset">
            <RadioGroup defaultValue="express" aria-label="paymentOptions" name="paymentOptions">
              <FormControlLabel value="express" control={<Radio />} label="Expresso (em até 1 dia útil)" />
              <FormControlLabel value="normal" control={<Radio />} label="Normal (de 3 a 4 dias úteis)" />
            </RadioGroup>
          </FormControl>
        </s.StyledCol>
        {/* <s.StyledCol xs={6} component="ul" justify="end">
          <li>Valor a pagar pelo frete: <span>$ 0.00</span></li>
          <li>Valor a pagar pelo frete: <span>$ 0.00</span></li>
        </s.StyledCol> */}
      </s.StyledRow>
      {/* </Visible> */}
      {/* <Visible md lg xl>
      <s.StyledRow component="li">
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
        </s.StyledRow>
      </Visible> */}
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
