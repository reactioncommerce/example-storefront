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
      // const Categories = (initialGridSize, shop) => {
      const mock = {
        page: {
          name: "Vestidos",
          breadcrumb: {
            link: "/categories/vestidos",
            root: {
              name: "Categorias",
              link: "/categories"
            }
          },
          title: "About us !",
          description: `In sit amet quam nec lacus sodales facilisis ac quis sapien. Morbi gravida pellentesque nunc, sed 
      imperdiet urna dictum nec. Nam et fringilla ante. Donec placerat tellus nunc, nec aliquam ipsum tempor at. 
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. P`,
          banner: "static/images/banner.png",
          pagination: {
            limit: 8,
            actual: 1,
            total: 22,
            visible: "1-4"
          },
          products: [
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod3.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod3.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod5.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod3.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod3.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod5.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod3.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod3.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod1.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod2.png"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod5.jpg"
            },
            {
              title: "Vestido",
              price: "99.99",
              cashPrice: "79.99",
              photo: "../static/images/home/prod4.jpg"
            }
          ]
        }
      };

      useEffect(() => {
        console.log(catalogItems);
      });

      const renderHeaderMetatags = (metafields) => {
        // const { shop } = this.props;

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
              <Row align="start" justify="start">
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
