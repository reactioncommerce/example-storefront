import React from "react";
import InstagramIcon from "mdi-material-ui/Instagram";
import FacebookIcon from "mdi-material-ui/Facebook";
import YoutubeIcon from "mdi-material-ui/Youtube";
import PinterestIcon from "mdi-material-ui/Pinterest";
import TwiiterIcon from "mdi-material-ui/Twitter";
import LinkedinIcon from "mdi-material-ui/LinkedinBox";
import { Visible } from "react-grid-system";
import {
  paymentsAccepted,
  certificates,
  aboutAccordion,
  helpAccordion,
  accountAccordion
} from "../../helpers/constants";
import Accordion from "./Accordion/Accordion";
import * as styles from "./style";

const Footer = () => {
  const accordions = [aboutAccordion, helpAccordion, accountAccordion];

  return (
    <div>
      <Visible sm xs>
        <styles.Container>
          <styles.UpsideContent>
            {accordions && accordions.map((item, idx) => <Accordion key={idx} title={item.title} links={item.links} />)}
            <styles.FollowOnChannels>Acompanhe nos canais</styles.FollowOnChannels>
            <styles.SocialIcons>
              <InstagramIcon />
              <FacebookIcon />
              <YoutubeIcon className="youtube-icon" />
              <PinterestIcon />
              <TwiiterIcon />
              <LinkedinIcon />
            </styles.SocialIcons>
          </styles.UpsideContent>

          <styles.MiddleContent>
            <styles.ContentBlock>
              <styles.Title>Aceitamos</styles.Title>
              <styles.InnerImages>
                {paymentsAccepted && paymentsAccepted.map((item, idx) => <styles.BrandIcon key={idx} alt={item.alt} src={item.src} />)}
              </styles.InnerImages>
            </styles.ContentBlock>
            <styles.ContentBlock>
              <styles.Title>Certificados</styles.Title>
              <styles.InnerImages>
                {certificates && certificates.map((item, idx) => <styles.BrandIcon key={idx} alt={item.alt} src={item.src} />)}
              </styles.InnerImages>
            </styles.ContentBlock>
            <styles.ContentBlock>
              <styles.Title>Empowered By</styles.Title>
              <styles.InnerImages>
                <styles.UnboxLogo alt={"Unbox Logo"} src={"../../static/images/unbox-logo.png"} />
              </styles.InnerImages>
            </styles.ContentBlock>
          </styles.MiddleContent>

          <styles.BottomContent>
            <styles.BrandLogo alt={"Brand Logo"} src={"../../static/images/logo.png"} />
            <styles.InnerInfo>
              Companhia © 2019 | Todos os direitos reservados | companhia.com.br | contato@contato.com.br | atividades de
              internet | Ltda <br />
              CNPJ: xxxxxxxxxx/xxxx-xx | Av. Isaltino Victor de Moraes, 437, Vila Bonfim, Embu das Artes, SP, 06806-400 -
              (11) 3197-4883
            </styles.InnerInfo>
          </styles.BottomContent>
        </styles.Container>
      </Visible>
      <Visible md lg xl >
      <styles.Container>
        FOOTER WEB
      </styles.Container>
    </Visible>
    </div>
  );
};

export default Footer;
