/* eslint-disable no-console */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Visible } from "react-grid-system";
import * as s from "./style";


const BrandTabs = (props) => {
  const [currentTab, setCurrentTab] = useState(0);

  const setTabsButtons = (tabs) => Object.keys(tabs).map((button, index) => (
    <s.TabsHeadItem>
      <s.TabButton onClick={() => setCurrentTab(index)} value={index} >
        <s.ButtonValue className={(index === currentTab ? " active" : " ")}>
          { tabs[button].name ? tabs[button].name : button }
        </s.ButtonValue>
      </s.TabButton>
    </s.TabsHeadItem>
  ));

  const setTabs = (tabs) => Object.keys(tabs).map((tab, index) => (
    <s.Tab className={(index === currentTab ? "active" : null)}>
      <s.TabImage src={tabs[tab].photo} />
      <s.TabText/>
      {tabs[tab].text}
    </s.Tab>
  ));

  return (
    <s.StyledContainer>
      <Visible xs sm>
        <s.Tabs>
          <s.TabsHead>
            { setTabsButtons(props.tabs)}
          </s.TabsHead>
          <s.TabsContent>
            { setTabs(props.tabs) }
          </s.TabsContent>
      </s.Tabs>
      </Visible>
      <Visible md lg xl>
        <Row align="center" justify="center">
          <Col md={6}>
            <s.ItemTitle>Missão</s.ItemTitle>
            <s.ItemSubtitle>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </s.ItemSubtitle>
          </Col>
          <s.StyledCol md={6}>
            <s.Image src="/static/images/brand-image.png"/>
          </s.StyledCol>
        </Row>
        <Row align="center" justify="center">
          <s.StyledCol md={6}>
            <s.Image src="/static/images/brand-image.png"/>
          </s.StyledCol>
          <Col md={6}>
            <s.ItemTitle className="right">Visão</s.ItemTitle>
            <s.ItemSubtitle className="right">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </s.ItemSubtitle>
          </Col>
        </Row>
        <Row align="center" justify="center">
          <Col md={6}>
            <s.ItemTitle>Valores</s.ItemTitle>
            <s.ItemSubtitle>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </s.ItemSubtitle>
          </Col>
          <s.StyledCol md={6}>
            <s.Image src="/static/images/brand-image.png"/>
          </s.StyledCol>
        </Row>
      </Visible>
    </s.StyledContainer>
  );
};

BrandTabs.propTypes = {
  tabs: PropTypes.object
};

export default BrandTabs;
