import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Drawer from "@material-ui/core/Drawer";
import withTag from "../../containers/tags/withTag";
import * as s from "./style";

const CategoriesDrawer = inject("uiStore")(
  observer(({ uiStore, tagData }) => {
    useEffect(() => {
      console.log(tagData);
    }, [tagData]);
    const handleClose = () => {
      uiStore.closeCategoriesDrawer();
    };

    return (
      <Drawer
        anchor="top"
        open={uiStore.isCategoriesDrawerOpen}
        onClose={handleClose}
        ModalProps={{ style: { top: "95px" } }}
        BackdropProps={{ style: { position: "absolute" } }}
        PaperProps={{ style: { position: "absolute" } }}
        variant="temporary"
      >
        <s.Container>
          <s.Content>
            <s.Left>
              <s.Title>Categorias</s.Title>
              <s.Divider />
            </s.Left>
          </s.Content>
        </s.Container>
      </Drawer>
    );
  })
);

CategoriesDrawer.propTypes = {
  uiStore: PropTypes.shape({
    closeCategoriesDrawer: PropTypes.func
  }).isRequired
};

export default withTag(CategoriesDrawer);
