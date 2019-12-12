import React from "react";
import { Col, Row, Container, Visible } from "react-grid-system";
import * as s from "./style";
import PropTypes from "prop-types";


const Breadcrumb = (props) => {
  const { pageName, breadcrumb } = props;

  return (
    <Container>
      <Row align="start" justify="start">
        <s.BreacrumbList >
          <s.Item><s.StyledLink route={"/"}>Home</s.StyledLink></s.Item>
          <s.Separator>/</s.Separator>
          { (breadcrumb.root.link
            ? <div><s.Item><s.StyledLink route={breadcrumb.root.link}>{breadcrumb.root.name}</s.StyledLink></s.Item><s.Separator>/</s.Separator></div>
            : null)
          }
          <s.Item className="active">{pageName}</s.Item>
        </s.BreacrumbList>
      </Row>
    </Container>
  );
};

Breadcrumb.proptype = {
  pageName: PropTypes.string,
  breadcrumb: PropTypes.object,
  routingStore: PropTypes.shape({
    slugOrId: PropTypes.string
  })
};

export default Breadcrumb;
