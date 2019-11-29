import React, { useState } from "react";
import PropTypes from "prop-types";
import * as s from "./style";


const Accordion = (props) => {
  const { title, items } = props.array;
  const [currentFaq, setCurrentFaq] = useState(0);

  return (
    <s.AccordionSection>
      <s.Title>{title}</s.Title>
      <s.AccordionItems>
        {items.map((item, index) => (
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
        ))}
      </s.AccordionItems>
    </s.AccordionSection>
  );
};

Accordion.propTypes = {
  array: PropTypes.array
};

export default Accordion;
