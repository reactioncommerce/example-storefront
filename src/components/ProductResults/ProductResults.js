import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ResultsHeader from "components/ResultsHeader";
import { Container, Row } from "react-grid-system";
import withWidth from "@material-ui/core/withWidth";
import * as s from "./style";

const ProductResults = ({
  catalogItems,
  currencyCode,
  initialSize,
  isLoadingCatalogItems,
  pageInfo,
  pageSize,
  setPageSize,
  setSortBy,
  sortBy,
  pageName
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 0,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  useEffect(() => {
    console.log(`Produtos: ${catalogItems.length}`);
    console.log(`Total de itens que podem ser exibidos: ${pageSize}`);
    console.log(`Total de páginas: ${catalogItems.length / pageSize}`);
    console.log(`Informações da página (loadNextPage, prevPage): ${pageInfo}`);
  });

  const totalPages = Math.round(catalogItems.length / pageSize);
  const pageProducts = (catalogItems || []).map((item) => item.node.product);

  const setPagination = (total) => {
    const array = [];
    for (let index = 0; index < total; index += 1) {
      array.push(index + 1);
    }
    return array;
  };

  const setProducts = (products) => {
    return products.map((product) => (
      <s.Product xs={6} md={3}>
        <s.Content>
          <s.ProductImage>
            <s.Image src={product.primaryImage && product.primaryImage.URLs.medium} />
            <s.Button>Comprar</s.Button>
          </s.ProductImage>
          <s.Description>
            <s.ProductTitle>{product.title}</s.ProductTitle>
            <s.Price>de $ {product.pricing[0].maxPrice}</s.Price>
            <s.SpecialPrice>
              por <s.Span>${product.pricing[0].minPrice}</s.Span> á vista
            </s.SpecialPrice>
          </s.Description>
        </s.Content>
      </s.Product>
    ));
  };

  return (
    <Container>
      <ResultsHeader itemsOnScreen={1} totalItems={122} pageName={pageName} />

      <s.ProductResults>
        {setProducts(pageProducts)}

        <s.Pagination {...settings}>
          {setPagination(totalPages).map((pageIndex) => (
            // <s.PaginationItem key={pageIndex} className={page.pagination.actual === pageIndex ? "active" : null}>
            <s.PaginationItem key={pageIndex} className={null}>
              {pageIndex}
            </s.PaginationItem>
          ))}
        </s.Pagination>
      </s.ProductResults>
    </Container>
  );
};

ProductResults.propTypes = {
  catalogItems: PropTypes.array,
  currencyCode: PropTypes.string,
  initialSize: PropTypes.object,
  isLoadingCatalogItems: PropTypes.bool,
  pageInfo: PropTypes.object,
  pageName: PropTypes.string,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string
};

export default withWidth()(ProductResults);
