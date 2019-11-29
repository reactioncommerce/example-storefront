import React, { useState } from "react";
import Helmet from "react-helmet";
import Accordion from "components/Accordion";
import ContactForm from "components/ContactForm";
import TermsButtons from "../components/TermsButtons";

const Terms = (shop) => {
  const mock = {
    page: {
      title: "Frequently Asked Questions",
      description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
      imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
      devolution: {
        title: "Devolution:",
        items: [{
          title: "Malesuada fames ac",
          text: "Donec placerat tellus nec aliquam ipsum tempor at." 
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristique ." 
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristique ."
        }, {
          title: "Malesuada fames ac", 
          text: "Donec placerat tellus nec aliquam ipsum tempor at."
        }]
      },
      terms: {
        title: "Terms:",
        items: [{
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristique ." 
        }, {
          title: "Malesuada fames ac",
          text: "Donec placerat tellus nec aliquam ipsum tempor at." 
        }, {
          title: "Morbi tristique senectus",
          text: "In sit amet quam nec  ac turpis egestas habitant morbi tristique ." 
        }]
      },
      refund: {
        title: "Refund:",
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
        }]
      },
      contact: {
        title: "Olá, tudo bem ?",
        description: "Estamos aqui para ajudar, temos uma área com perguntas frequentes que pode ser util, mas se ainda tiver qualquer duvida é só nos avisar por aqui. :)"
      }
    }
  };

  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : "FAQ";
  const [ currentTab, setCurrentTab] = useState(1);
  return (
    <div>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <div>
        <TermsButtons currentTab={currentTab} setCurrentTab={setCurrentTab}/>
        {currentTab === 1 ? <Accordion array={mock.page.terms}/> : null}
        {currentTab === 2 ? <Accordion array={mock.page.devolution}/> : null}
        {currentTab === 3 ? <Accordion array={mock.page.refund}/> : null}
      </div>
      <ContactForm contact={mock.page.contact}/>
    </div>
  );
};

export default Terms;
