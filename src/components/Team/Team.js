/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
import * as s from "./style";

/**
* Mount team section with the members.
* @param {array} members Array with the members.
* @returns {component} the team component mounted.
*/
const setMembers = (members) => members.map((member) => (
  <s.Member>
    <s.Image src={member.photo} alt=""/>
    <s.MemberName>{member.name}</s.MemberName>
    <s.MemberPosition>{member.position}</s.MemberPosition>
  </s.Member>
));

const Team = (props) => (
  <s.TeamSection>
    <s.Title>{ props.team.title }</s.Title>
    <s.Description>{ props.team.description }</s.Description>
    <s.Members>{ setMembers(props.team.members) }</s.Members>
  </s.TeamSection>
);

Team.propTypes = {
  team: PropTypes.object
};

export default Team;
