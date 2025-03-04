import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import Wishes from './Wishes';
import Button from '../common/Button';

const ProductHeader = ({ product }) => {
  return (
    <div className="flex flex-col gap-[12px] px-[20px] border-b-[1px] border-light-gray pb-[20px]">
      {/* 상품명 */}
      <h2 className="font-semibold text-black text-title-md">{product.name}</h2>

      <div className="flex items-center justify-between ">
        <div className="flex gap-[20px] items-center">
          {/* 판매완료 여부 */}
          <span
            className={`text-center px-3 text-caption h-[20px] min-w-[80px] rounded-full leading-[20px] ${product.soldout ? 'bg-gray text-deep-gray' : 'bg-deep-mint text-white'}`}
          >
            {product.soldout ? '판매 완료' : '판매중'}
          </span>
          {/* 상품 가격*/}
          <span className="font-semibold text-title-sm text-deep-mint">
            {Number(product.price).toLocaleString()}원
          </span>
        </div>
        {/* 찜하기 */}
        <Wishes productId={product.id} />
      </div>
    </div>
  );
};

export default ProductHeader;
