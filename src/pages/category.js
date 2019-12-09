import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import Breadcrumb from "components/Breadcrumb";
import Breadcrumbs from "components/Breadcrumbs";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withTag from "containers/tags/withTag";
import ProductResults from "components/ProductResults";
import { Row, Container } from "react-grid-system";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import InfoCarousel from "../components/InfoCarousel";

const Categories = inject(
  "uiStore",
  "routingStore"
)(
  observer(
    ({
      initialGridSize,
      shop,
      uiStore,
      tag,
      tags,
      routingStore,
      catalogItems,
      isLoadingCatalogItems,
      catalogItemsPageInfo
    }) => {
      useEffect(() => {
        // console.log(catalogItems);
        if (tag && routingStore.tagId !== tag._id) {
          routingStore.setTagId(tag._id);
          routingStore.setSearch({
            before: null,
            after: null
          });
        }
      }, [tag, routingStore]);

      const renderHeaderMetatags = (metafields) => {
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
      };

      const setPageSize = (pageSize) => {
        routingStore.setSearch({ limit: pageSize });
        uiStore.setPageSize(pageSize);
      };

      const setSortBy = (sortBy) => {
        routingStore.setSearch({ sortby: sortBy });
        uiStore.setSortBy(sortBy);
      };

      const pageSize =
        routingStore.query && routingStore.query.limit ? parseInt(routingStore.query.limit, 10) : uiStore.pageSize;
      const sortBy = routingStore.query && routingStore.query.sortby ? routingStore.query.sortby : uiStore.sortBy;

      return (
        <div>
          <Container fluid>
            <Helmet
              title={`${tag && tag.name} | ${shop && shop.name}`}
              meta={
                tag && tag.metafields && tag.metafields.length > 0
                  ? renderHeaderMetatags(tag.metafields)
                  : [{ name: "description", content: shop && shop.description }]
              }
            />
            <Container>
              <Row align="start" justify="start" style={{ marginTop: "25px" }}>
                {/* <Breadcrumb pageName={mock.page.name} breadcrumb={mock.page.breadcrumb} /> */}
                <Breadcrumbs isTagGrid tagId={routingStore.tagId} />
              </Row>
            </Container>
            <Row direction="column" align="center" justify="center">
              {/* <ProductResults page={mock.page} /> */}
              <ProductResults
                catalogItems={catalogItems}
                currencyCode={shop.currency.code}
                initialSize={initialGridSize}
                isLoadingCatalogItems={isLoadingCatalogItems}
                pageInfo={catalogItemsPageInfo}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setSortBy={setSortBy}
                sortBy={sortBy}
                pageName={tag.name}
              />
            </Row>
            <InfoCarousel />
          </Container>
        </div>
      );
    }
  )
);

Categories.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  const width = (userAgent && userAgent.indexOf("Mobi")) > -1 ? 320 : 1024;
  return { initialGridSize: { width } };
};

Categories.propTypes = {
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
export default withTag(withCatalogItems(Categories));
