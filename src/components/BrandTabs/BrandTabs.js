/* eslint-disable no-console */
import React, { useState } from "react";
import PropTypes from "prop-types";
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
    <s.Tabs>
      <s.TabsHead>
        { setTabsButtons(props.tabs)}
      </s.TabsHead>
      <s.TabsContent>
        { setTabs(props.tabs) }
      </s.TabsContent>
    </s.Tabs>
  );
};

BrandTabs.propTypes = {
  tabs: PropTypes.object
};

export default BrandTabs;
