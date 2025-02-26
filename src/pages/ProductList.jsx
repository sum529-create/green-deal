import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';

const ProductList = () => {
  return (
    <div className='flex w-full'>
      <div className='w-[25%] bg-accent'>
        검색
      </div>
      <div className='w-[75%]'>
        <span className='text-2xl'>지금 우리 동네 인기 매물 TOP 20</span>
        <KakaoMap width={'916px '} height={'640px'} />
      </div>
    </div>
  );
};

export default ProductList;
