import React from 'react';

const ProductDescription = ({ product }) => {
  return (
    <div className="p-4 space-y-2">
      <h3 className="font-semibold text-title-sm text-deep-gray">상품 설명</h3>
      <p className="mx-4 text-deep-gray text-text-md">{product.description}</p>
    </div>
  );
};

export default ProductDescription;
