import React, { useState } from "react";
import PropTypes from "prop-types";
import Arrow from "../../Icons/Arrow";
import * as styles from "./style";

const Accordion = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <styles.Container onClick={() => setIsOpen(!isOpen)}>
      <styles.InlineContent>
        <styles.Title>{title}</styles.Title>
        <Arrow direction={isOpen ? "up" : "down"} />
      </styles.InlineContent>
      <styles.HiddenContent visible={isOpen}>
        <styles.ListOfLinks>
          {links &&
            links.map((link) => {
              return <styles.LinkItem>{link.title}</styles.LinkItem>;
            })}
        </styles.ListOfLinks>
      </styles.HiddenContent>
    </styles.Container>
  );
};

Accordion.propTypes = {
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default Accordion;
