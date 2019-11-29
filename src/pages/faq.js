import React from "react";
import Helmet from "react-helmet";
import PageHeader from "components/PageHeader";
import FaqContent from "components/FaqContent";
import ContactForm from "components/ContactForm";

const BrandPage = (shop) => {
  const mock = {
    page: {
      title: "Frequently Asked Questions",
      description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
      imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
      banner: "static/images/banner-faq.png",
      faq: {
        title: "",
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
    <div>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <PageHeader page={mock.page} />
      <FaqContent faq={mock.page.faq}/>
      <ContactForm contact={mock.page.contact}/>
    </div>
  );
};

export default BrandPage;
