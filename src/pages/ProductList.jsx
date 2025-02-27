import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import { useState } from 'react';
import SearchBar from '../components/ProductList/SearchBar';
import SearchList from '../components/ProductList/SearchList';

const productList = [
  {
    id: 1,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    refund: false,
    location: { lat: 33.450701, lng: 126.570667 },
    description: '싸다 싸! 신발보다 싸!',
    img: '',
    user_id: 1,
    soldout: true,
    updated_at: '',
  },
  {
    id: 2,
    createdAt: '2024-02-28T12:34:56.789Z',
    name: '축구공',
    category: '스포츠/레저',
    price: '100000',
    quality: '중상',
    refund: false,
    location: { lat: 33.250701, lng: 126.270667 },
    description: '사용감 살짝 있습니다!',
    img: '',
    user_id: 2,
    soldout: true,
    updated_at: '2024-02-29T12:34:56.789Z',
  },
  {
    id: 3,
    createdAt: '2024-02-27T12:38:56.789Z',
    name: '맥북 Air',
    category: '디지털기기',
    price: '1000000',
    quality: '최상',
    refund: false,
    location: { lat: 33.550701, lng: 126.670667 },
    description: '개봉만 했습니다.',
    img: '',
    user_id: 1,
    soldout: true,
    updated_at: '',
  },
  {
    id: 4,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    efund: false,
    location: { lat: 33.450701, lng: 126.570667 },
    description: '싸다 싸! 신발보다 싸!',
    img: '',
    user_id: 1,
    soldout: true,
    updated_at: '',
  },
  {
    id: 5,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    refund: false,
    location: { lat: 33.450701, lng: 126.570667 },
    description: '싸다 싸! 신발보다 싸!',
    img: '',
    user_id: 1,
    soldout: true,
    updated_at: '',
  },
  {
    id: 6,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    refund: false,
    location: { lat: 33.450701, lng: 126.570667 },
    description: '싸다 싸! 신발보다 싸!',
    img: '',
    user_id: 1,
    soldout: true,
    updated_at: '',
  },
  {
    id: 7,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    refund: false,
    location: { lat: 33.450701, lng: 126.570667 },
    description: '싸다 싸! 신발보다 싸!',
    img: '',
    user_id: 1,
    soldout: true,
    updated_at: '',
  },
];

const ProductList = () => {
  const [search, setSearch] = useState('');

  const filteredProducts = productList.filter((product) =>
    product.name.includes(search),
  );

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden md:flex-row">
      <div className="w-full mr-4 border-r-2 border-light-gray h-full bg-white md:w-[360px]">
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
