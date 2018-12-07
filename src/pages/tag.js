import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withTag from "containers/tags/withTag";
import Breadcrumbs from "components/Breadcrumbs";
import ProductGrid from "components/ProductGrid";
import ProductGridHero from "components/ProductGridHero";
import ProductGridTitle from "components/ProductGridTitle";
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
    isLoadingCatalogItems: PropTypes.bool,
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    tag: PropTypes.object,
    tags: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    tag: {}
  };

  static getDerivedStateFromProps(props) {
    const { routingStore, tag } = props;
    if (routingStore.tag._id !== tag._id) {
      routingStore.setTag(tag);
      routingStore.setSearch({
        before: null,
        after: null
      });
    }
    return null;
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

  render() {
    const {
      catalogItems,
      catalogItemsPageInfo,
      isLoadingCatalogItems,
      routingStore: { query },
      shop,
      tag,
      tags,
      uiStore
    } = this.props;
    const pageSize = query && query.limit ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;

    return (
      <Fragment>
        <Helmet
          title={`${tag && tag.name} | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <Breadcrumbs isTagGrid={true} tag={tag} tags={tags} />
        <ProductGridTitle displayTitle={tag.displayTitle} />
        <ProductGridHero tag={tag} />
        <ProductGrid
          catalogItems={catalogItems}
          currencyCode={shop.currency.code}
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
