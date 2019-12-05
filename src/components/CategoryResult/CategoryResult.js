import React from "react";
import PropTypes from "prop-types";
import CategoryHeader from "components/CategoryHeader";
import { Container, Row } from "react-grid-system";

import * as s from "./style";


const setPagination = (total) => {
  let array = [];
  for (let i = 0; i < total; i++) {
    array.push(i + 1)
  }
  return array;
};

const showPageProducts = (order) => {

}

const CategoryResult = (props) => {
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
      <CategoryHeader page={page} totalPages={totalPages} />
      <s.CategoryResults component="ul">
        { pageProducts.map((product) => (
          <s.Product component="li" xs={6} md={3}>
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
        )) }

        <s.Pagination {...settings}>
          {setPagination(totalPages).map((pageIndex) => (
            <s.PaginationItem className={(page.pagination.actual === pageIndex ? "active" : null)}>{pageIndex}</s.PaginationItem>
          ))}
        </s.Pagination>
      </s.CategoryResults>
    </Container>
  );
};

CategoryResult.propTypes = {
  page: PropTypes.object
};


export default CategoryResult;
