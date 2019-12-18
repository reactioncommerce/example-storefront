import React from "react";
import Helmet from "react-helmet";
import PageHeader from "components/PageHeader";
import About from "components/About";
import Team from "components/Team";
import BrandTabs from "components/BrandTabs";
import Newsletter from "components/Newsletter";
import MainCarousel from "components/MainCarousel";
import { Container, Row, Col, Visible } from "react-grid-system";

const BrandPage = (shop) => {
  const mock = {
    page: {
      title: "About us !",
      description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
      imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
      banner: "static/images/banner.png",
      webBanner: "static/images/banner-faq-web.png",
      tabs: {
        mission: {
          name: "missão",
          text: "In sit amet quam nec lacus sodales facilisis ac quis sapien.",
          photo: "static/images/banner.png"
        },
        vision: {
          name: "visão",
          text: "Pellentesque habitant morbi tristique senectus et netus et",
          photo: "static/images/banner.png"
        },
        values: {
          name: "valores",
          text: "Nam et fringilla ante. Donec placerat tellus nunc",
          photo: "static/images/banner.png"
        }
      },
      slider: [{
        title: "slide 01",
        description: "In sit amet quam nec lacus sodales facilisis ac quis sapien. ",
        photo: "static/images/brand-image.png"
      }, {
        title: "slide 02",
        description: "In sit amet quam nec lacus sodales facilisis ac quis sapien. ",
        photo: "static/images/brand-image.png"
      }],
      newsletter: {
        title: "Subscribe our newsletter",
        description: "Pellentesque habitant morbi tristique senectus et netus et",
        callToAction: "Subscribe"
      },
      team: {
        title: "Our team",
        description: " tristique senectus et netus et malesuada fames ac turpis egestas.",
        members: [
          { name: "Mathias", position: "Front-end developer", photo: "static/images/brand-image.png" },
          { name: "Denis", position: "Front-end developer", photo: "static/images/brand-image.png" },
          { name: "Gabi", position: "CPO", photo: "static/images/brand-image.png" },
          { name: "Bruno", position: "CEO", photo: "static/images/brand-image.png" }
        ]
      }
    }
  };

  const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

  return (
    <Container fluid>
      <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
      <Visible xs sm>
        <PageHeader page={mock.page}/>
      </Visible>
      <Visible md lg xl>
        <MainCarousel />
      </Visible>
      <About page={mock.page}/>
      <Team team={mock.page.team}/>
      <BrandTabs tabs={mock.page.tabs}/>
      <Newsletter newsletter={mock.page.newsletter}/>
    </Container>
  );
};

export default BrandPage;
