import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import { useState } from 'react';
import SearchBar from '../components/ProductList/SearchBar';
import SearchList from '../components/ProductList/SearchList';
import { useGetProducts } from '../hooks/useProduct';

const ProductList = () => {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, isLoading, isError } = useGetProducts();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const filteredProducts = products.data.filter((product) =>
    product.name.includes(search),
  );

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden md:flex-row">
      <div className="w-full mr-4 border-r border-light-gray h-full bg-white md:w-[360px]">
        <SearchBar setSearch={setSearch} />
        <SearchList
          filteredProducts={filteredProducts || []}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setSearch={setSelectedProduct}
        />
      </div>
      <div className="flex flex-col w-full md:w-3/4">
        <span className="p-4 text-2xl">지금 우리 동네 인기 매물 TOP 20</span>
        <div className="flex-grow full min-h-[400px]">
          <KakaoMap
            level={5}
            mode={'productList'}
            productList={products.data}
            selectedProduct={selectedProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
