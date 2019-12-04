import React from "react";
import PropTypes from "prop-types";
import CategoryHeader from "components/CategoryHeader";
import * as s from "./style";


const setPagination = (total) => {
  let array = []
  for(let i = 0; i < total; i++) {
    array.push(i + 1)
  }
  return array;
};

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
  console.log("prod", page.products.length)
  const pageProducts = page.products.slice(0, page.limit);
  return (
    <div>
      <CategoryHeader page={page} totalPages={totalPages} />
      <s.CategoryResults>
        { pageProducts.map((product) => (
          <s.Product>
            <s.ProductImage>
              <s.Image src={product.photo}/>
              <s.Button>Comprar</s.Button>
            </s.ProductImage>
            <s.Description>
              <s.ProductTitle>{product.title}</s.ProductTitle>
              <s.Price>de $ {product.price}</s.Price>
              <s.SpecialPrice>por <s.Span>${product.cashPrice}</s.Span> á vista</s.SpecialPrice>
            </s.Description>
          </s.Product>
        )) }

        <s.Pagination {...settings}>
          {setPagination(totalPages).map((pageIndex) => (
            <s.PaginationItem>{pageIndex}</s.PaginationItem>
          ))}
        </s.Pagination>
      </s.CategoryResults>
    </div>
  );
};

CategoryResult.propTypes = {
  page: PropTypes.object
};


export default CategoryResult;
