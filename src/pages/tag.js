import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withTag from "containers/tags/withTag";
import Breadcrumbs from "components/Breadcrumbs";
import ProductGrid from "components/ProductGrid";
import ProductGridEmptyMessage from "components/ProductGrid/ProductGridEmptyMessage";
import ProductGridHero from "components/ProductGridHero";
import ProductGridTitle from "components/ProductGridTitle";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import trackProductListViewed from "lib/tracking/trackProductListViewed";

@withTag
@withCatalogItems
@inject("routingStore", "uiStore")
@observer
export default class TagGridPage extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired,
    catalogItemsPageInfo: PropTypes.object,
    classes: PropTypes.object,
    initialGridSize: PropTypes.object,
    isLoadingCatalogItems: PropTypes.bool,
    routingStore: PropTypes.shape({
      query: PropTypes.shape({
        limit: PropTypes.string,
        sortby: PropTypes.string
      }),
      setSearch: PropTypes.func.isRequired,
      tag: SharedPropTypes.tag
    }),
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      }),
      description: PropTypes.string
    }),
    tag: SharedPropTypes.tag,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired
    })
  };

  static getDerivedStateFromProps(props) {
    const { routingStore, tag } = props;
    if (tag && routingStore.tagId !== tag._id) {
      routingStore.setTagId(tag._id);
      routingStore.setSearch({
        before: null,
        after: null
      });
    }

    return null;
  }

  static async getInitialProps({ req }) {
    // It is not perfect, but the only way we can guess at the screen width of the
    // requesting device is to parse the `user-agent` header it sends.
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    const width = (userAgent && userAgent.indexOf("Mobi")) > -1 ? 320 : 1024;

    return { initialGridSize: { width } };
  }

  state = {};

  componentDidUpdate(prevProps) {
    if (this.props.catalogItems !== prevProps.catalogItems) {
      this.trackEvent(this.props);
    }
  }

  @trackProductListViewed()
  trackEvent() {}

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  renderHeaderMetatags(metafields) {
    const { shop } = this.props;

    const metatags = [];
    let hasDescription = false;
    metafields.forEach((field) => {
      if (field.namespace && field.namespace === "metatag") {
        const metatag = {
          content: field.value
        };
        metatag[field.scope] = field.key;
        metatags.push(metatag);
        if (field.key === "description") {
          hasDescription = true;
        }
      }
    });
    if (hasDescription === false) {
      metatags.push({ name: "description", content: shop && shop.description });
    }
    return metatags;
  }

  render() {
    const {
      catalogItems,
      catalogItemsPageInfo,
      initialGridSize,
      isLoadingCatalogItems,
      routingStore,
      shop,
      tag,
      uiStore
    } = this.props;
    const pageSize = routingStore.query && routingStore.query.limit ? parseInt(routingStore.query.limit, 10) : uiStore.pageSize;
    const sortBy = routingStore.query && routingStore.query.sortby ? routingStore.query.sortby : uiStore.sortBy;

    if (!tag) {
      return (
        <ProductGridEmptyMessage
          actionMessage="Go Home"
          resetLink="/"
        />
      );
    }

    return (
      <Fragment>
        <Helmet
          title={`${tag && tag.name} | ${shop && shop.name}`}
          meta={
            tag && tag.metafields && tag.metafields.length > 0 ?
              this.renderHeaderMetatags(tag.metafields)
              :
              [{ name: "description", content: shop && shop.description }]
          }
        />
        <Breadcrumbs isTagGrid tagId={routingStore.tagId} />
        {
          tag && tag.displayTitle && <ProductGridTitle displayTitle={tag.displayTitle} />
        }
        <ProductGridHero tag={tag} />
        <ProductGrid
          catalogItems={catalogItems}
          currencyCode={shop.currency.code}
          initialSize={initialGridSize}
          isLoadingCatalogItems={isLoadingCatalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={pageSize}
          setPageSize={this.setPageSize}
          setSortBy={this.setSortBy}
          sortBy={sortBy}
        />
      </Fragment>
    );
  }
}
