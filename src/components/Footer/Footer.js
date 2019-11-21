import React from "react";
import InstagramIcon from "mdi-material-ui/Instagram";
import FacebookIcon from "mdi-material-ui/Facebook";
import YoutubeIcon from "mdi-material-ui/Youtube";
import PinterestIcon from "mdi-material-ui/Pinterest";
import TwiiterIcon from "mdi-material-ui/Twitter";
import LinkedinIcon from "mdi-material-ui/LinkedinBox";
import Accordion from "./Accordion/Accordion";
import * as styles from "./style";

const Footer = () => {
  const aboutAccordion = {
    title: "Sobre",
    links: [
      { title: "A Marca", href: "/" },
      { title: "Nosso Time", href: "/" },
      { title: "Nossa Cultura", href: "/" }
    ]
  };

  const helpAccordion = {
    title: "Ajuda",
    links: [
      { title: "Fale Conosco", href: "/" },
      { title: "Termos e Condições", href: "/" },
      { title: "Políticas de Devolução", href: "/" },
      { title: "Políticas de Reembolso", href: "/" }
    ]
  };

  const accountAccordion = {
    title: "Conta",
    links: [
      { title: "Minha conta", href: "/" },
      { title: "Meus pedidos", href: "/" }
    ]
  };

  const accordions = [aboutAccordion, helpAccordion, accountAccordion];

  return (
    <styles.Container>
      <styles.UpsideContent>
        {accordions && accordions.map((item) => <Accordion title={item.title} links={item.links} />)}
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
    </styles.Container>
  );
};

export default Footer;
