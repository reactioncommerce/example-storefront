import React, { useState } from "react";
import Helmet from "react-helmet";
import Accordion from "components/Accordion";
import ContactForm from "components/ContactForm";
import { Container, Row, Col, Visible } from "react-grid-system";
import TermsButtons from "../components/TermsButtons";
import Breadcrumb from "../components/Breadcrumb";

const Terms = (shop) => {
  const mock = {
    page: {
      name: "Devoluções e Reembolso",
      breadcrumb: {
        link: "/terms",
        root: {
          name: null,
          link: null
        }
      },
      title: "Frequently Asked Questions",
      description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
      imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
      devolution: {
        title: "Devolution:",
        items: [{
          title: "Malesuada fames ac",
          text: "Donec pDonec placerat tellus nec aliquam ipsum tempor atlacerat tellus nec aliDonec placerat tellus nec aliquam ipsum tempor atquam ipsum tempor at." 
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet Donec placerat tellus nec aliquam ipsum tempor atquam nec  ac tuDonec placerat tellus nec aliquam ipsum tempor atrpis egestas habitant morbi tristique ." 
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristiqueDonec Donec placerat tellus nec aliquam ipsum tempor atplacerat tellus nec aliquam ipsum tempor at ."
        }, {
          title: "Malesuada fames ac", 
          text: "Donec placerat teDonec placerat tellus nec aliquam ipsum tempor aDonec placerat tellus nec aliquam ipsum tempor attllus nec aliquam ipsum tempor at."
        }]
      },
      terms: {
        title: "Terms:",
        items: [{
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbDonec placDonec placerat tellus nec aliquam ipsum tempor atrat tellus nec aliquam ipsum tempor ati tristique ." 
        }, {
          title: "Malesuada fames ac",
          text: "Donec placerat Donec placerat tellus nec aliquam ipsum tempor atDonec placerat tellus nec aliquam ipsum tempor attellus nec aliquam ipsum tempor at." 
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam Donec placerat tellus nec aliquam ipsDonec placerat tellus nec aliquam ipsum tempor atum tempor atnec  ac turpis egestas habitant morbi tristique ." 
        }]
      },
      refund: {
        title: "Refund:",
        items: [{
          title: "Morbi tristique senectus",
          text: "In sit amet quam Donec placerat tellus nec aliquam ipsuDonec placerat tellus nec aliquam ipsum tempor atm tempor atnec  ac turpis egestas habitant morbi tristique ." 
        }, {
          title: "Malesuada fames ac",
          text: "Donec placerat tellus nec aliquam ipsum temDonec placerat tellus nec aliquam ipsum tempor atDonec placerat tellus nec aliquam ipsum tempor atpor at."
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitanDoDonec placerat tellus nec aliquam ipsum tempor atnec placerat tellus nec aliquam ipsum tempor att morbi tristique ."
        }, {
          title: "Malesuada fames ac", 
          text: "Donec placerat tellus nec aliquam ipsum tempor atDonec plaDonec placerat tellus nec aliquam ipsum tempor atcerat tellus nec aliquam ipsum tempor at."
        }]
      },
      contact: {
        title: "Olá, tudo bem ?",
        description: "Estamos aqui para ajudar, temos uma área com perguntas frequentes que pode ser util, mas se ainda tiver qualquer duvida é só nos avisar por aqui. :)"
      }
    }
  };

  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : "Devoluções e Reembolso";
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <Container style={{ background: "#fafafa", paddingTop: 30 }} fluid>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb}/>

      <Container style={{ background: "#fff", padding: 30 }}>
        <Row>
          <TermsButtons currentTab={currentTab} setCurrentTab={setCurrentTab}/>
        </Row>
        <Row>
          {currentTab === 1 ? <Accordion title={mock.page.terms.title} array={mock.page.terms.items}/> : null}
          {currentTab === 2 ? <Accordion title={mock.page.devolution.title} array={mock.page.devolution.items}/> : null}
          {currentTab === 3 ? <Accordion title={mock.page.refund.title} array={mock.page.refund.items}/> : null}
        </Row>
      </Container>
    </Container>
  );
};

export default Terms;
