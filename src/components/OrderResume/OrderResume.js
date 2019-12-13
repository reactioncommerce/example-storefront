/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import {  Row, Col } from "react-grid-system";
import * as s from "./style";


const OrderResume = (props) => {
  const { order } = props;

  return (
    <Col xs={12} component="ul">
      <h2>Resumo do pedido</h2>
      <Row align="center" justify="between">
        <h4>Subtotal ({ order.items.length })</h4>
        <span>{order.totalItemsPrice}</span>
      </Row>
      <Row align="center" justify="between">
        <h4>Frete</h4>
        <span>{order.shipmentPrice}</span>
      </Row>
      <hr/>
      <Row align="center" justify="between">
        <h2>Total</h2>
        <span>{order.totalItemsPrice + order.shipmentPrice}</span>
      </Row>
    </Col>
  );

};

OrderResume.propTypes = {
  isVisible: PropTypes.bool
};

export default OrderResume;
