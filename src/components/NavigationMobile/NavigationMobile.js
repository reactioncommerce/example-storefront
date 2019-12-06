import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import SearchField from "components/SearchField";
import NavItemsMenuMobile from "components/NavItemsMenuMobile";
import Link from "components/Link";
import UserIcon from "../Icons/User";
import InfoIcon from "../Icons/Info";
import * as styles from "./style";

@inject("uiStore")
@observer
class NavigationMobile extends Component {
  static propTypes = {
    uiStore: PropTypes.shape({
      closeMenuDrawer: PropTypes.func
    }).isRequired
  };

  handleClose = () => {
    this.props.uiStore.closeMenuDrawer();
  };

  render() {
    const { uiStore } = this.props;

    return (
      <Drawer
        open={uiStore.isMenuDrawerOpen}
        onClose={this.handleClose}
        BackdropProps={{ style: { position: "absolute" } }}
        PaperProps={{ style: { top: "23px", position: "absolute" } }}
        variant="temporary"
      >
        <styles.Container>
          <styles.Header>
            <SearchField />
          </styles.Header>
          <Divider style={{ backgroundColor: "#9c27b1" }} />
          <NavItemsMenuMobile handleClose={this.handleClose} />
          <Divider style={{ marginTop: "30px" }} />

          <styles.Footer>
            <styles.LinkContainer>
              <Link route="/" onClick={this.handleClose}>
                <UserIcon />
                Minha conta
              </Link>
            </styles.LinkContainer>

            <styles.LinkContainer>
              <Link route="/" onClick={this.handleClose}>
                <InfoIcon />
                Ajuda
              </Link>
            </styles.LinkContainer>
          </styles.Footer>
        </styles.Container>
      </Drawer>
    );
  }
}

export default NavigationMobile;
