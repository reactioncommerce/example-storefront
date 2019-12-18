import React from "react";
import { Container, Row, Col, Visible } from "react-grid-system";
import Helmet from "react-helmet";
import PageHeader from "components/PageHeader";
import Accordion from "components/Accordion";
import ContactForm from "components/ContactForm";

const BrandPage = (shop) => {
  const mock = {
    page: {
      title: "Frequently Asked Questions",
      description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
      imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
      banner: "static/images/banner-faq.png",
      webBanner: "static/images/banner-faq-web.png",
      faq: {
        title: "See bellow:",
        items: [{
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristique ." 
        }, {
          title: "Malesuada fames ac",
          text: "Donec placerat tellus nec aliquam ipsum tempor at." 
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristique ." 
        }, {
          title: "Malesuada fames ac",
          text: "Donec placerat tellus nec aliquam ipsum tempor at."
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristique ."
        }, {
          title: "Malesuada fames ac", 
          text: "Donec placerat tellus nec aliquam ipsum tempor at."
        }]
      },
      contact: {
        title: "Olá, tudo bem ?",
        description: "Estamos aqui para ajudar, temos uma área com perguntas frequentes que pode ser util, mas se ainda tiver qualquer duvida é só nos avisar por aqui. :)"
      }
    }
  };

  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : "FAQ";

  return (
    <Container fluid styles={{ background: "#f1f1f1" }}>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <PageHeader page={mock.page} />
      <Container styles={{ background: "#fff" }}>
        <Accordion array={mock.page.faq.items}/>
      </Container>
      <ContactForm contact={mock.page.contact}/>
    </Container>
  );
};

export default BrandPage;
