import React from "react";
import PropTypes from "prop-types";
import CategoryHeader from "components/CategoryHeader";
import * as s from "./style";

const CategoryResult = (props) => {
  const { page } = props;
  const totalPages = Math.round(page.products.length, page.limit);
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

        <s.Pagination>
        </s.Pagination>
      </s.CategoryResults>
    </div>
  );
};

CategoryResult.propTypes = {
  page: PropTypes.object
};


export default CategoryResult;
