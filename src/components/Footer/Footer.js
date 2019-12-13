import React from "react";
import InstagramIcon from "mdi-material-ui/Instagram";
import FacebookIcon from "mdi-material-ui/Facebook";
import YoutubeIcon from "mdi-material-ui/Youtube";
import PinterestIcon from "mdi-material-ui/Pinterest";
import TwiiterIcon from "mdi-material-ui/Twitter";
import LinkedinIcon from "mdi-material-ui/LinkedinBox";
import { Visible, Row, Col, Container } from "react-grid-system";
import Link from "components/Link";
import {
  paymentsAccepted,
  certificates,
  aboutAccordion,
  helpAccordion,
  accountAccordion
} from "../../helpers/constants";
import Accordion from "./Accordion/Accordion";
import * as s from "./style";

const Footer = () => {
  const accordions = [aboutAccordion, helpAccordion, accountAccordion];

  return (
    <div>
      <Visible sm xs>
        <s.Container>
          <s.UpsideContent>
            {accordions && accordions.map((item, idx) => <Accordion key={idx} title={item.title} links={item.links} />)}
            <s.FollowOnChannels>Acompanhe nos canais</s.FollowOnChannels>
            <s.SocialIcons>
              <InstagramIcon />
              <FacebookIcon />
              <YoutubeIcon className="youtube-icon" />
              <PinterestIcon />
              <TwiiterIcon />
              <LinkedinIcon />
            </s.SocialIcons>
          </s.UpsideContent>

          <s.MiddleContent>
            <s.ContentBlock>
              <s.Title>Aceitamos</s.Title>
              <s.InnerImages>
                {paymentsAccepted && paymentsAccepted.map((item, idx) => <s.BrandIcon key={idx} alt={item.alt} src={item.src} />)}
              </s.InnerImages>
            </s.ContentBlock>
            <s.ContentBlock>
              <s.Title>Certificados</s.Title>
              <s.InnerImages>
                {certificates && certificates.map((item, idx) => <s.BrandIcon key={idx} alt={item.alt} src={item.src} />)}
              </s.InnerImages>
            </s.ContentBlock>
            <s.ContentBlock>
              <s.Title>Empowered By</s.Title>
              <s.InnerImages>
                <s.UnboxLogo alt={"Unbox Logo"} src={"../../static/images/unbox-logo.png"} />
              </s.InnerImages>
            </s.ContentBlock>
          </s.MiddleContent>

          <s.BottomContent>
            <s.BrandLogo alt={"Brand Logo"} src={"../../static/images/logo.png"} />
            <s.InnerInfo>
              Companhia © 2019 | Todos os direitos reservados | companhia.com.br | contato@contato.com.br | atividades de
              internet | Ltda <br />
              CNPJ: xxxxxxxxxx/xxxx-xx | Av. Isaltino Victor de Moraes, 437, Vila Bonfim, Embu das Artes, SP, 06806-400 -
              (11) 3197-4883
            </s.InnerInfo>
          </s.BottomContent>
        </s.Container>
      </Visible>
      <Visible md lg xl >
        <s.Container>
          <Container>
            <s.Footer component="footer">

              <Col md={3} component="ul">
                <li className="title">Sobre</li>
                <li><Link route={"/brand"}>A marca</Link></li>
                <li><Link route={"/brand#team"}>Nosso Time</Link></li>
                <li><Link route={"/brand#cuture"}>Nossa Cultura</Link></li>
              </Col>
              <Col md={3} component="ul">
                <li className="title">Ajuda</li>
                <li><Link route={"/"}>Fale Conosco</Link></li>
                <li><Link route={"/"}>Termos e Condições</Link></li>
                <li><Link route={"/"}>Politicas de Devolução</Link></li>
                <li><Link route={"/"}>Politicas de Reembolso</Link></li>
              </Col>
              <Col md={3} component="ul">
                <li className="title">Conta</li>
                <li><Link route={"/"}>Minha Conta</Link></li>
                <li><Link route={"/"}>Meus Pedidos</Link></li>
              </Col>
              <Col md={3} component="ul">
                <li className="title">Acompanhe nos canais</li>
              </Col>

            </s.Footer>
          </Container>
        </s.Container>
        <s.EmpoweredContainer>
          <Container>
            <Row align="center" justify="center">
              <Col component="ul" md={3}>
                <li className="title">Empowered by</li>
                <li><img src="/static/images/unbox-logo.png"/></li>
              </Col>
              <Col component="ul" md={4}>
                <li className="title">Certificados</li>
                <li><img src="/static/images/certs.png"/></li>

              </Col>
              <Col component="ul" md={5}>
                <li className="title">Aceitamos</li>
                <li><img src="/static/images/payment.png"/></li>

              </Col>
            </Row>
          </Container>
        </s.EmpoweredContainer>
        <s.CopyrightContainer>
          <Container>
            <Row>
              <Col component="ul" md={2}>
                <li><img src="/static/images/logo.png"/></li>
              </Col>
              <Col component="ul" md={10}>
                <p> Companhia © 2019 | Todos os direitos reservados | companhia.com.br | contato@contato.com.br | atividades de internet | Ltda
                    CNPJ: xxxxxxxxxx/xxxx-xx | Av. Isaltino Victor de Moraes, 437, Vila Bonfim, Embu das Artes, SP, 06806-400 - (11) 3197-4883</p>
              </Col>
            </Row>
          </Container>
        </s.CopyrightContainer>
      </Visible>
    </div>
  );
};

export default Footer;
