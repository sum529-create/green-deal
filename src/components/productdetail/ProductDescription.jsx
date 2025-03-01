import React from 'react';

const ProductDescription = ({ product }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-deep-gray">상품 설명</h3>
      <p className="text-deep-gray">{product.description}</p>
    </div>
  );
};

export default ProductDescription;
