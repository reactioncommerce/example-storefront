import React from "react";
import PropTypes from "prop-types";
import ResultsHeader from "components/ResultsHeader";
import { Container, Row } from "react-grid-system";

import * as s from "./style";


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
          <s.Image src={product.photo}/>
          <s.Button>Comprar</s.Button>
        </s.ProductImage>
        <s.Description>
          <s.ProductTitle>{product.title}</s.ProductTitle>
          <s.Price>de $ {product.price}</s.Price>
          <s.SpecialPrice>por <s.Span>${product.cashPrice}</s.Span> á vista</s.SpecialPrice>
        </s.Description>
      </s.Content>
    </s.Product>
  ));
};

const ProductResults = (props) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 0,
    slidesToShow: 4,
    slidesToScroll: 4
  };
  const { page } = props;
  const totalPages = Math.round(page.products.length / page.pagination.limit);
  const pageProducts = page.products.slice(0, page.pagination.limit);
  return (
    <Container>
      <ResultsHeader page={page} totalPages={totalPages} />
      <s.ProductResults>
        { setProducts(pageProducts)}

        <s.Pagination {...settings}>
          {setPagination(totalPages).map((pageIndex) => (
            <s.PaginationItem key={pageIndex} className={(page.pagination.actual === pageIndex ? "active" : null)}>{pageIndex}</s.PaginationItem>
          ))}
        </s.Pagination>
      </s.ProductResults>
    </Container>
  );
};

ProductResults.propTypes = {
  page: PropTypes.object
};


export default ProductResults;
