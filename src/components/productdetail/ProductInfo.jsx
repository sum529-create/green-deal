import React from 'react';

const ProductInfo = ({ product }) => {
  const PRODUCT_INFO_CSS = 'ml-4 text-text-md text-deep-gray';

  return (
    <div className="p-4 space-y-2 bg-white rounded-lg">
      <h3 className="font-semibold text-title-sm text-deep-gray">상품정보</h3>
      <p className={PRODUCT_INFO_CSS}>
        <strong>상태 :</strong> {product.quality}
      </p>
      <p className={PRODUCT_INFO_CSS}>
        <strong>교환 :</strong> {product.refund ? '가능' : '불가능'}
      </p>
      <p className={PRODUCT_INFO_CSS}>
        <strong>카테고리:</strong> {product.category}
      </p>
    </div>
  );
};

export default ProductInfo;
