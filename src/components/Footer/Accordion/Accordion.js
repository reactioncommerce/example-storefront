import React, { useState } from "react";
import PropTypes from "prop-types";
import Arrow from "../../Icons/Arrow";
import * as styles from "./style";

const Accordion = ({ id, title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <styles.Container id={`accordion-item-${id}`} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <styles.InlineContent>
        <styles.Title className="accordion-title">{title}</styles.Title>
        <Arrow direction={isOpen ? "up" : "down"} />
      </styles.InlineContent>
      <styles.HiddenContent visible={isOpen}>
        <styles.ListOfLinks>
          {links &&
            links.map((link, idx) => {
              return <styles.LinkItem key={idx}>{link.title}</styles.LinkItem>;
            })}
        </styles.ListOfLinks>
      </styles.HiddenContent>
    </styles.Container>
  );
};

Accordion.propTypes = {
  id: PropTypes.string,
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

Arrow.defaultProps = {
  id: 0
};

export default Accordion;
