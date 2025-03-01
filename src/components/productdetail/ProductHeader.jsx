import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const ProductHeader = ({ product }) => {
  return (
    <div className="flex flex-col pace-y-6">
      {/* 상품명 */}
      <div className="flex">
        <h2 className="text-2xl font-bold">{product.name}</h2>
      </div>

      <div className="flex items-center justify-between">
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
        <FaRegStar className="text-2xl text-gray-500 cursor-pointer hover:text-yellow-400" />
      </div>
    </div>
  );
};

export default ProductHeader;
