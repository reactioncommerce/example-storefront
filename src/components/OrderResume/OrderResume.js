/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-grid-system";
import * as s from "./style";


const OrderResume = (props) => {
  const { order } = props;

  return (
    <s.StyledContainer>
      <s.StyledCol xs={12} component="ul" >
        <s.StyledRow align="center" justify="between">
          <s.ResumeTitle>Resumo do pedido</s.ResumeTitle>
        </s.StyledRow>
        <s.StyledRow align="center" justify="between">
          <s.ResumeSubtitle>Subtotal ({ order.items.length })</s.ResumeSubtitle>
          <s.Price>$ {order.totalItemsPrice}</s.Price>
        </s.StyledRow>
        <s.StyledRow align="center" justify="between">
          <s.ResumeSubtitle>Frete</s.ResumeSubtitle>
          <s.Price>$ {order.shipmentPrice}</s.Price>
        </s.StyledRow>
        <hr/>
        <s.StyledRow align="center" justify="between">
          <s.Total>TOTAL</s.Total>
          <s.Price>$ {order.totalItemsPrice + order.shipmentPrice}</s.Price>
        </s.StyledRow>
      </s.StyledCol>
    </s.StyledContainer>

  );

};

OrderResume.propTypes = {
  isVisible: PropTypes.bool
};

export default OrderResume;
