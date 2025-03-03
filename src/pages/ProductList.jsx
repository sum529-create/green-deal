import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import { useState } from 'react';
import SearchBar from '../components/ProductList/SearchBar';
import SearchList from '../components/ProductList/SearchList';
import { useGetProducts } from '../hooks/useProduct';
import AllowedRoute from '../routes/AllowedRoute';

const ProductList = () => {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, isLoading, isError } = useGetProducts(search);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden md:flex-row">
      <div className="w-full mr-4 border-r border-light-gray h-full bg-white md:w-[360px]">
        <SearchBar setSearch={setSearch} />
        <SearchList
          filteredProducts={products.data || []}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </div>
      <div className="flex flex-col w-full md:w-3/4">
        <span className="p-4 text-2xl">지금 우리 동네 인기 매물 TOP 20</span>
        <AllowedRoute>
          <KakaoMap
            level={5}
            mode={'productList'}
            productList={products.data}
            selectedProduct={selectedProduct}
          />
        </AllowedRoute>
      </div>
    </div>
  );
};

export default ProductList;
