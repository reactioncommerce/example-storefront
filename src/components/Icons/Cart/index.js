import React from "react";
import PropTypes from "prop-types";

const Cart = ({ size, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21.128" height="25.402" viewBox="0 0 21.128 25.402">
      <path
        id="Caminho_2"
        d="M237 162.372v1h-4.55a.749.749 0 0 0-.746.746v14.9a3.487 3.487 0 0 0 3.484 3.484h14.159a3.487 3.487 0 0 0 3.485-3.484V164.11a.749.749 0 0 0-.746-.746h-4.55v-1a5.268 5.268 0 0 0-10.536.008zm14.754 2.484v14.159a2.562 2.562 0 0 1-2.125 2.46h-15.012c-1.1 0-1.86-1.361-1.86-2.46v-14.54H237v2.472c0 .41.187.746.6.746s.571-.336.571-.746v-2.472h8.179v2.472c0 .41.215.746.625.746s.571-.336.571-.746v-2.472h4.21zm-9.482-6.662a4.026 4.026 0 0 1 4.075 3.75l-.008 1.428h-8.179v-1.241a4.221 4.221 0 0 1 4.108-3.937z"
        class="cls-1"
        fill="#4f4d4d"
        data-name="Caminho 2"
        transform="translate(-231.704 -157.1)"
      />
    </svg>
  );
};

Cart.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

Cart.defaultProps = {
  size: "30px",
  color: "#333"
};

export default Cart;
