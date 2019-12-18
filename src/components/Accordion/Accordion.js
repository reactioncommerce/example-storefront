import React, { useState } from "react";
import PropTypes from "prop-types";
import * as s from "./style";

const Accordion = ({ title, array }) => {
  const [currentFaq, setCurrentFaq] = useState(0);

  return (
    <s.AccordionSection>
      <s.Title>{title || null}</s.Title>
      <s.AccordionItems>
        {array.map((item, index) => (
          <s.Item onClick={() => setCurrentFaq(index)}>
            <s.ItemContent>
              <s.ItemTitle>{item.title}</s.ItemTitle>
              {item.list ? (
                <s.ItemText className={currentFaq === index ? "active" : " "}>
                  {item.list.map((obj) => (
                    <s.InlineText>{`${obj.key}: ${obj.value}`}</s.InlineText>
                  ))}
                </s.ItemText>
              ) : (
                <s.ItemText className={currentFaq === index ? "active" : " "}>{item.text}</s.ItemText>
              )}
            </s.ItemContent>
            <s.ItemButton className={currentFaq === index ? "active" : " "}>
              <s.ItemIcon>{currentFaq === index ? "-" : "+"}</s.ItemIcon>
            </s.ItemButton>
          </s.Item>
        ))}
      </s.AccordionItems>
    </s.AccordionSection>
  );
};

Accordion.propTypes = {
  array: PropTypes.array,
  title: PropTypes.string
};

export default Accordion;
