import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';

const ProductList = () => {
  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="w-full p-4 md:w-1/4 bg-accent">
        <p className="text-lg font-bold">검색</p>
      </div>
      <div className="flex flex-col w-full md:w-3/4">
        <span className="p-4 text-2xl">지금 우리 동네 인기 매물 TOP 20</span>
        <div className="flex-grow full min-h-[400px]">
          <KakaoMap level={5} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
