import React from 'react';

const ProductInfo = ({ product }) => {
  return (
    <div className="p-4 space-y-2 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700">상품정보</h3>
      <p className="text-sm">
        <strong>상태 :</strong> {product.quality}
      </p>
      <p className="text-sm">
        <strong>교환 :</strong> {product.refund ? '가능' : '불가능'}
      </p>
      <p className="text-sm">
        <strong>카테고리:</strong> {product.category}
      </p>
    </div>
  );
};

export default ProductInfo;
