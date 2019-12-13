import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Container, Visible } from "react-grid-system";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import OrderResume from "components/OrderResume";
import order from "helpers/ORDER_MOCK.json";
import * as s from "./style";

const OrderDetail = (props) => {
  const { isVisible, setStepWizard } = props;
  const [feedback, setFeedback] = useState();
  const handleChange = (event) => setFeedback(event.target.value);
  const item = order.items[0];
  return (
    <Container component="ul">
      <s.StyledRow component="li">
        <Col xs={4}>
          <s.ImageBox>
            <s.Image src={item.photo} alt=""/>
          </s.ImageBox>
        </Col>
        <s.StyledCol xs={8}>
          <s.Title><b>Nº do pedido: </b>{item.number}</s.Title>
          <s.Variant>Data do pedido: {item.date}</s.Variant>
          <s.Variant>Total: {item.total}</s.Variant>
          <s.Variant>Status do pedido:  
            {item.statusCode === 3 ? (<s.Span success> {item.status}</s.Span>) : null}
            {item.statusCode === 5 ? (<s.Span canceled> {item.status}</s.Span>) : null}
            {item.statusCode === 1 ? (<s.Span process> {item.status}</s.Span>) : null}

          </s.Variant>
          {item.status === "entregue" && item.statusCode === 3 ? (
            <s.Buttons>
              <s.IconButton><s.Icon src="../../static/images/icon-detalhes.svg"/> Detalhes</s.IconButton>
              <s.IconButton><s.Icon src="../../static/images/icon-devolucao.svg"/> Devolver</s.IconButton>
            </s.Buttons>
          ) : null}
        </s.StyledCol>
        {item.status === "entregue" && item.statusCode === 3 ? (
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
      <s.StyledRow>
        <Col sm={12}>
          <h3>Endereço de Entrega</h3>
          <p>Rua Emergildo Afonso, 33 - Parada Norte - CEP 00000-000 - São Paulo - SP</p>
        </Col>
      </s.StyledRow>
      <s.StyledRow>
        <Col sm={12}>
          <h3>Forma de Pagamento</h3>
          <p>Cartão de crédito final: XXXX</p>
          <p><span>$99</span> parcelado em 10x sem juros</p>
        </Col>
      </s.StyledRow>
      <s.StyledRow>
        <Col sm={12}>
          <h3>Resumo do Pagamento</h3>
          <OrderResume order={order} />
        </Col>
      </s.StyledRow>
      <s.StyledRow>
        <Col sm={12}>
          <h3>Previsão de entrega</h3>
          <p>Até o dia 21/12/2019</p>
        </Col>
      </s.StyledRow>
      <s.StyledRow>
        <Col sm={12}>
          <h3>Status da entrega</h3>
          <s.StyledList>
            <li>Pedido confirmado</li>
            <li>Pagamento aprovado</li>
            <li className="active">Enviando pedido</li>
            <li>Pedido entregue</li>
          </s.StyledList>
        </Col>
      </s.StyledRow>
    </Container>
  );
};

OrderDetail.propTypes = {
  isVisible: PropTypes.bool,
  setStepWizard: PropTypes.func
};

export default OrderDetail;
