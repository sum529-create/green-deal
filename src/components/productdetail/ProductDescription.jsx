import React from 'react';

const ProductDescription = ({ product }) => {
  return (
    <div className="px-[20px] lg:px-[30px] py-[20px] border-b-[1px] border-light-gray text-deep-gray">
      <h3 className="font-semibold text-title-sm mb-[20px]">상품 설명</h3>
      <p className="text-text-md">{product.description}</p>
    </div>
  );
};

export default ProductDescription;
