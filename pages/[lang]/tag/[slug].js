import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import Breadcrumbs from "components/Breadcrumbs";
import ProductGrid from "components/ProductGrid";
import ProductGridEmptyMessage from "components/ProductGrid/ProductGridEmptyMessage";
import ProductGridHero from "components/ProductGridHero";
import ProductGridTitle from "components/ProductGridTitle";
import Layout from "components/Layout";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTag from "staticUtils/tag/fetchTag";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

class TagGridPage extends Component {
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

  state = {};

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
      isLoadingCatalogItems,
      routingStore,
      shop,
      tag,
      uiStore
    } = this.props;
    const pageSize = routingStore.query && routingStore.query.limit ? parseInt(routingStore.query.limit, 10) : uiStore.pageSize;
    const sortBy = routingStore.query && routingStore.query.sortby ? routingStore.query.sortby : uiStore.sortBy;

    if (!tag && !shop) {
      return (
        <Layout shop={shop}>
          <ProductGridEmptyMessage
            actionMessage="Go Home"
            resetLink="/"
          />
        </Layout>
      );
    }

    return (
      <Layout shop={shop}>
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
          isLoadingCatalogItems={isLoadingCatalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={pageSize}
          setPageSize={this.setPageSize}
          setSortBy={this.setSortBy}
          sortBy={sortBy}
        />
      </Layout>
    );
  }
}

/**
 *  Static props for the tags route
 *
 * @param {String} lang - the shop's language
 * @param {String} slug - the tag's slug
 * @returns {Object} props
 */
export async function getStaticProps({ params: { lang, slug } }) {
  const primaryShop = await fetchPrimaryShop(lang);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        translations: null,
        fetchAllTags: null,
        tag: null
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1 // Revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      ...await fetchTranslations(lang, ["common"]),
      ...await fetchAllTags(lang),
      ...await fetchTag(slug, lang)
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
}

/**
 *  Static path for the tags route
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale, slug: "-" } })),
    fallback: true
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(TagGridPage)));
