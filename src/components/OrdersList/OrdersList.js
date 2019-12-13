import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Container, Visible } from "react-grid-system";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import orders from "helpers/ORDER_MOCK.json";
import * as s from "./style";

const OrdersList = (props) => {
  const { isVisible, setStepWizard } = props;
  const [feedback, setFeedback] = useState();
  const handleChange = (event) => setFeedback(event.target.value);

  return (
    <Container fluid>
      <Visible xs sm>
        <Row>
          <s.PageTitle>Meus Pedidos</s.PageTitle>
        </Row>
        <Container component="ul">
          {orders.items.map((order) => (
            <s.StyledRow component="li">
              <Col xs={4}>
                <s.ImageBox>
                  <s.Image src={order.photo} alt=""/>
                </s.ImageBox>
              </Col>
              <s.StyledCol xs={8}>
                <s.Title><b>Nº do pedido: </b>{order.number}</s.Title>
                <s.Variant>Data do pedido: {order.date}</s.Variant>
                <s.Variant>Total: {order.total}</s.Variant>
                <s.Variant>Status do pedido:  
                  {order.statusCode === 3 ? (<s.Span success> {order.status}</s.Span>) : null}
                  {order.statusCode === 5 ? (<s.Span canceled> {order.status}</s.Span>) : null}
                  {order.statusCode === 1 ? (<s.Span process> {order.status}</s.Span>) : null}

                </s.Variant>
                {order.status === "entregue" && order.statusCode === 3 ? (
                  <s.Buttons>
                    <s.IconButton><s.Icon src="static/images/icon-detalhes.svg"/> Detalhes</s.IconButton>
                    <s.IconButton><s.Icon src="static/images/icon-devolucao.svg"/> Devolver</s.IconButton>
                  </s.Buttons>
                ) : null}
              </s.StyledCol>
              {order.status === "entregue" && order.statusCode === 3 ? (
                <s.StyledCol xs={12}>
                  <s.Button primary>Comprar novamente</s.Button>
                  <s.Paragraph> Em uma escala de 0 a 10 como foi sua experiência com a gente ? queremos ser perfeitos :)</s.Paragraph>
                  <s.Feedback>
                    <input id="zero" type="radio" name="feedback" value="zero"/>
                    <s.StyledLabel htmlFor="zero">0</s.StyledLabel>
                    <input id="one" type="radio" name="feedback" value="one"/>
                    <s.StyledLabel htmlFor="one">1</s.StyledLabel>
                    <input id="two" type="radio" name="feedback" value="two"/>
                    <s.StyledLabel htmlFor="two">2</s.StyledLabel>
                    <input id="three" type="radio" name="feedback" value="three"/>
                    <s.StyledLabel htmlFor="three">3</s.StyledLabel>
                    <input id="four" type="radio" name="feedback" value="four"/>
                    <s.StyledLabel htmlFor="four">4</s.StyledLabel>
                    <input id="five" type="radio" name="feedback" value="five"/>
                    <s.StyledLabel htmlFor="five">5</s.StyledLabel>
                    <input id="six" type="radio" name="feedback" value="six"/>
                    <s.StyledLabel htmlFor="six">6</s.StyledLabel>
                    <input id="seven" type="radio" name="feedback" value="seven"/>
                    <s.StyledLabel htmlFor="seven">7</s.StyledLabel>
                    <input id="eight" type="radio" name="feedback" value="eight"/>
                    <s.StyledLabel htmlFor="eight">8</s.StyledLabel>
                    <input id="nine" type="radio" name="feedback" value="nine"/>
                    <s.StyledLabel htmlFor="nine">9</s.StyledLabel>
                    <input id="ten" type="radio" name="feedback" value="ten"/>
                    <s.StyledLabel htmlFor="ten">10</s.StyledLabel>
                  </s.Feedback>
                  <s.Textarea placeholder="Digite aqui"/>
                  <s.Button secondary>Enviar</s.Button>
                </s.StyledCol>
              ) : null }
              
            </s.StyledRow>
          ))}
        </Container>
      </Visible>
      <Visible md lg xl>
        <Container>
          <Row>
            <s.Menu md={3}>
              
              <s.StyledLink route={"/account"}>
                <s.MenuIcon src="static/images/icon-profile.svg"/>
                Minha Conta
              </s.StyledLink>
              <s.StyledLink className="active" route={"/"}>
                <s.MenuIcon src="static/images/icon-orders.svg"/>
                Meus Pedidos
              </s.StyledLink>
            </s.Menu>
            <Col md={8} component="ul">
              {orders.items.map((order) => (
                <s.StyledRow component="li">
                  <Col xs={4} sm={4} md={3}>
                    <s.ImageBox>
                      <s.Image src={order.photo} alt=""/>
                    </s.ImageBox>
                  </Col>
                  <s.StyledCol xs={8} md={5}>
                    <s.Title><b>Nº do pedido: </b>{order.number}</s.Title>
                    <s.Variant>Data do pedido: {order.date}</s.Variant>
                    <s.Variant>Total: {order.total}</s.Variant>
                    <s.Variant>Status do pedido:  
                      {order.statusCode === 3 ? (<s.Span success> {order.status}</s.Span>) : null}
                      {order.statusCode === 5 ? (<s.Span canceled> {order.status}</s.Span>) : null}
                      {order.statusCode === 1 ? (<s.Span process> {order.status}</s.Span>) : null}

                    </s.Variant>
                    {order.status === "entregue" && order.statusCode === 3 ? (
                      <Visible xs sm>
                        <s.Buttons>
                          <s.IconButton><s.Icon src="static/images/icon-detalhes.svg"/> Detalhes</s.IconButton>
                          <s.IconButton><s.Icon src="static/images/icon-devolucao.svg"/> Devolver</s.IconButton>
                        </s.Buttons>
                      </Visible>
                    ) : null }
                  </s.StyledCol>
                  {order.status === "entregue" && order.statusCode === 3 ? (
                    <Visible md lg xl>
                      <s.StyledCol md={4}>
                        <s.IconButton>Detalhes<s.Icon src="static/images/icon-detalhes.svg"/></s.IconButton>
                        <s.IconButton><s.Icon src="static/images/icon-devolucao.svg"/> Devolver</s.IconButton>
                        <s.Button primary>Comprar novamente</s.Button>
                      </s.StyledCol>
                    </Visible>
                  ) : null }
                  {order.status === "entregue" && order.statusCode === 3 ? (
                    
                    <s.StyledCol xs={12}>
                      <Visible xs sm>
                        <s.Button primary>Comprar novamente</s.Button>
                      </Visible>
                      <s.Paragraph> Em uma escala de 0 a 10 como foi sua experiência com a gente ? queremos ser perfeitos :)</s.Paragraph>
                      <s.Feedback>
                        <input id="zero" type="radio" name="feedback" value="zero"/>
                        <s.StyledLabel htmlFor="zero">0</s.StyledLabel>
                        <input id="one" type="radio" name="feedback" value="one"/>
                        <s.StyledLabel htmlFor="one">1</s.StyledLabel>
                        <input id="two" type="radio" name="feedback" value="two"/>
                        <s.StyledLabel htmlFor="two">2</s.StyledLabel>
                        <input id="three" type="radio" name="feedback" value="three"/>
                        <s.StyledLabel htmlFor="three">3</s.StyledLabel>
                        <input id="four" type="radio" name="feedback" value="four"/>
                        <s.StyledLabel htmlFor="four">4</s.StyledLabel>
                        <input id="five" type="radio" name="feedback" value="five"/>
                        <s.StyledLabel htmlFor="five">5</s.StyledLabel>
                        <input id="six" type="radio" name="feedback" value="six"/>
                        <s.StyledLabel htmlFor="six">6</s.StyledLabel>
                        <input id="seven" type="radio" name="feedback" value="seven"/>
                        <s.StyledLabel htmlFor="seven">7</s.StyledLabel>
                        <input id="eight" type="radio" name="feedback" value="eight"/>
                        <s.StyledLabel htmlFor="eight">8</s.StyledLabel>
                        <input id="nine" type="radio" name="feedback" value="nine"/>
                        <s.StyledLabel htmlFor="nine">9</s.StyledLabel>
                        <input id="ten" type="radio" name="feedback" value="ten"/>
                        <s.StyledLabel htmlFor="ten">10</s.StyledLabel>
                      </s.Feedback>
                      <s.Textarea placeholder="Digite aqui"/>
                      <s.Button secondary>Enviar</s.Button>
                    </s.StyledCol>
                  ) : null }
                </s.StyledRow>
              ))}
            </Col>
          </Row>
        </Container>
      </Visible>
    </Container>
  );
};

OrdersList.propTypes = {
  isVisible: PropTypes.bool,
  setStepWizard: PropTypes.func
};

export default OrdersList;
