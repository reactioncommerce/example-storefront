import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ResultsHeader from "components/ResultsHeader";
import { Container, Row } from "react-grid-system";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
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
  sortBy
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 0,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  useEffect(() => {
    console.log("huexxxx");
  });

  // const totalPages = Math.round(page.products.length / page.pagination.limit);
  const totalPages = pageSize;
  // const pageProducts = page.products.slice(0, page.pagination.limit);
  const pageProducts = (catalogItems || []).map((item) => item.node.product);
  console.log("render");
  console.log(pageProducts);
  const setPagination = (total) => {
    const array = [];
    for (let index = 0; index < total; index += 1) {
      array.push(index + 1);
    }
    return array;
  };

  const setProducts = (products) => {
    console.log("x" + products);
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
      {/* <ResultsHeader page={page} totalPages={totalPages} /> */}
      {/* <ResultsHeader totalPages={totalPages} /> */}
      <s.ProductResults>
        {setProducts(pageProducts)}

        <s.Pagination {...settings}>
          {setPagination(totalPages).map((pageIndex) => (
            <span>{pageIndex}</span>
            // <s.PaginationItem key={pageIndex} className={page.pagination.actual === pageIndex ? "active" : null}>
            //   {pageIndex}
            // </s.PaginationItem>
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
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string
};

export default withWidth()(ProductResults);
