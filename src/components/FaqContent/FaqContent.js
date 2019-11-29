import React, { useState } from "react";
import PropTypes from "prop-types";
import * as s from "./style";



const FaqContent = (props) => {
  const { title, items } = props.faq;
  const [currentFaq, setCurrentFaq] = useState(0);

  const setFaqItems = (array) => array.map((item, index) => (
    <s.Item onClick={() => setCurrentFaq(index)}>
      <s.ItemContent>
        <s.ItemTitle>
          {item.title}
        </s.ItemTitle>
        <s.ItemText className={(currentFaq === index ? "active" : " ")}>
          {item.text}
        </s.ItemText>
      </s.ItemContent>
      <s.ItemButton className={(currentFaq === index ? "active" : " ")}>
        <s.ItemIcon>
          {(currentFaq === index ? "-" : "+")}
        </s.ItemIcon>
      </s.ItemButton>
    </s.Item>
  ));

  return (
    <s.FaqSection>
      <s.Title>{title}</s.Title>
      <s.FaqItems>
        {setFaqItems(items)}
      </s.FaqItems>
    </s.FaqSection>
  );
};

FaqContent.propTypes = {
  faq: PropTypes.object
};

export default FaqContent;
