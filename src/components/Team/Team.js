/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Visible } from "react-grid-system";
import * as s from "./style";

/**
* Mount team section with the members.
* @param {array} members Array with the members.
* @returns {component} the team component mounted.
*/
const setMembers = (members) => members.map((member) => (
  <Col xs={6} md={3}>
    <s.Image src={member.photo} alt=""/>
    <s.MemberName>{member.name}</s.MemberName>
    <s.MemberPosition>{member.position}</s.MemberPosition>
  </Col>
));

const Team = (props) => (
  <s.TeamSection>
    <h2>Lorem Ipsum</h2>
    <Container>

      <s.Title>{ props.team.title }</s.Title>
      <s.Description>{ props.team.description }</s.Description>
      <Row>{ setMembers(props.team.members) }</Row>
    </Container>
  </s.TeamSection>
);

Team.propTypes = {
  team: PropTypes.object
};

export default Team;
