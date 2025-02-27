import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import SearchBar from '../components/ProductList/SearchBar';
import { useState } from 'react';
import SearchList from '../components/ProductList/SearchList';

const productList = [
  {
    id: 1,
    createdAt: '2024-02-27T12:34:56.789Z',
    product_name: '아이폰11',
    product_category: '디지털기기',
    product_price: '10000',
    product_quality: '최상',
    product_refund: false,
    product_location: { lat: 33.450701, lng: 126.570667 },
    product_description: '싸다 싸! 신발보다 싸!',
    product_img: '',
    user_id: 1,
    product_soldout: true,
    updated_at: '',
  },
  {
    id: 2,
    createdAt: '2024-02-28T12:34:56.789Z',
    product_name: '축구공',
    product_category: '스포츠/레저',
    product_price: '100000',
    product_quality: '중상',
    product_refund: false,
    product_location: { lat: 33.250701, lng: 126.270667 },
    product_description: '사용감 살짝 있습니다!',
    product_img: '',
    user_id: 2,
    product_soldout: true,
    updated_at: '2024-02-29T12:34:56.789Z',
  },
  {
    id: 3,
    createdAt: '2024-02-27T12:38:56.789Z',
    product_name: '맥북 Air',
    product_category: '디지털기기',
    product_price: '1000000',
    product_quality: '최상',
    product_refund: false,
    product_location: { lat: 33.550701, lng: 126.670667 },
    product_description: '개봉만 했습니다.',
    product_img: '',
    user_id: 1,
    product_soldout: true,
    updated_at: '',
  },
  {
    id: 4,
    createdAt: '2024-02-27T12:34:56.789Z',
    product_name: '아이폰11',
    product_category: '디지털기기',
    product_price: '10000',
    product_quality: '최상',
    product_refund: false,
    product_location: { lat: 33.450701, lng: 126.570667 },
    product_description: '싸다 싸! 신발보다 싸!',
    product_img: '',
    user_id: 1,
    product_soldout: true,
    updated_at: '',
  },
  {
    id: 5,
    createdAt: '2024-02-27T12:34:56.789Z',
    product_name: '아이폰11',
    product_category: '디지털기기',
    product_price: '10000',
    product_quality: '최상',
    product_refund: false,
    product_location: { lat: 33.450701, lng: 126.570667 },
    product_description: '싸다 싸! 신발보다 싸!',
    product_img: '',
    user_id: 1,
    product_soldout: true,
    updated_at: '',
  },
];

const ProductList = () => {
  const [search, setSearch] = useState('');

  const filteredProducts = productList.filter((product) =>
    product.product_name.includes(search),
  );

  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="w-full mr-4 border-r-2 border-light-gray bg-white md:w-[360px]">
        <SearchBar setSearch={setSearch} />
        <SearchList filteredProducts={filteredProducts || []} />
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
