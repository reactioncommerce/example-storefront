import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Header from "components/Header";
import Footer from "components/Footer";
import { withStyles } from "material-ui/styles";

const styles = () => ({
  main: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 20vh)"
  },
  article: {
    padding: "10px"
  }
});

const Layout = ({ children, title = "", ...props }) => {
  const { classes: { main, article } } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className={main}>
        <nav>Navigation</nav>
        <article className={article}>
          {children}
        </article>
      </main>
      <Footer />
    </React.Fragment>
  );
};

Layout.displayName = "Layout";

Layout.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  title: PropTypes.string
};

export default withStyles(styles)(Layout);
