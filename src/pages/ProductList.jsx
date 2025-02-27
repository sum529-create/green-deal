import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import SearchBar from '../components/ProductList/SearchBar';
import { useState } from 'react';
import SearchList from '../components/ProductList/SearchList';

const ProductList = () => {
  const [search, setSearch] = useState('');

  console.log(search);

  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="w-full p-4 bg-white md:w-1/4">
        <SearchBar setSearch={setSearch} />
        <SearchList />
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
