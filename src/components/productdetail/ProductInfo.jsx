import React from 'react';

const ProductInfo = ({ product }) => {
  return (
    <div className="px-[20px] lg:px-[30px] py-[20px] border-b-[1px] border-light-gray">
      <h3 className="font-semibold text-title-sm text-deep-gray mb-[20px]">
        상품 정보
      </h3>
      <ul className="text-text-md text-deep-gray">
        <li>
          <strong className="font-semibold">상태 : </strong>
          <span>{product.quality}</span>
        </li>
        <li className="mt-[14px]">
          <strong className="font-semibold">교환 : </strong>
          <span>{product.refund ? '가능' : '불가능'}</span>
        </li>
        <li className="mt-[14px]">
          <strong className="font-semibold">카테고리 : </strong>{' '}
          <span>{product.category}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductInfo;
