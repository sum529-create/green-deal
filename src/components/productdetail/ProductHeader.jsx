import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import Wishes from './Wishes';

const ProductHeader = ({ product }) => {
  return (
    <div className="flex flex-col px-4">
      {/* 상품명 */}
      <div className="flex mb-3">
        <h2 className="font-bold text-title-md">{product.name}</h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        {/* 상품 가격*/}
        <div className="flex">
          <p className="text-lg font-semibold text-deep-mint">
            {Number(product.price).toLocaleString()}원
          </p>
          {/* 판매완료 여부 */}
          <span
            className={`flex items-center justify-center mx-4 px-3 text-caption min-w-[80px] rounded-full ${product.soldout ? 'bg-gray text-deep-gray' : 'bg-deep-mint text-white'}`}
          >
            {product.soldout ? '판매 완료' : '판매중'}
          </span>
        </div>
        {/* 찜하기 */}
        <Wishes productId={product.id} />
      </div>
    </div>
  );
};

export default ProductHeader;
