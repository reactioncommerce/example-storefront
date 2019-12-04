import React from "react";
import * as s from "./style";


const Breadcrumb = (props) => {
  const { pageName, breadcrumb } = props;

  return (
    <s.BreacrumbList >
      <s.Item><s.StyledLink route={"/"}>Home</s.StyledLink></s.Item>
      <s.Separator>/</s.Separator>
      <s.Item><s.StyledLink route={breadcrumb.root.link}>{breadcrumb.root.name}</s.StyledLink></s.Item>
      <s.Separator>/</s.Separator>
      <s.Item>{pageName}</s.Item>
    </s.BreacrumbList>
  );
};


export default Breadcrumb;
