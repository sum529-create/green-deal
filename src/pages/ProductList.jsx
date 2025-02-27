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
    img: 'https://alephksa.com/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-1A__WWEN_0853ab85-adc4-47fb-8955-43df09cca9f1.jpg?v=1688733593&width=2048',
    user_id: 1,
    soldout: true,
    updated_at: '',
    users: {
      name: '임재원',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/2-25-11-73.png',
    },
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
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8aVBdXsDP6B4DJ9un1nLcIF-jwa3n-fjUeQ&s',
    user_id: 2,
    soldout: true,
    updated_at: '2024-02-29T12:34:56.789Z',
    users: {
      name: '오영진',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/10-539-44-430.png',
    },
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
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVi1KsUu2PdmxovPkDmUbXtykLZwkg4RavvA&s',
    user_id: 3,
    soldout: true,
    updated_at: '',
    users: {
      name: '김지윤',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/7-361-52-630.png',
    },
  },
  {
    id: 4,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    efund: false,
    location: { lat: 33.450701, lng: 126.570666 },
    description: '싸다 싸! 신발보다 싸!',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVi1KsUu2PdmxovPkDmUbXtykLZwkg4RavvA&s',
    user_id: 4,
    soldout: true,
    updated_at: '',
    users: {
      name: '최수진',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/8-36-63-636.png',
    },
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
    img: 'https://alephksa.com/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-1A__WWEN_0853ab85-adc4-47fb-8955-43df09cca9f1.jpg?v=1688733593&width=2048',
    user_id: 5,
    soldout: true,
    updated_at: '',
    users: {
      name: '장미경',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/10-368-4-573.png',
    },
  },
  {
    id: 6,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    refund: false,
    location: { lat: 33.450701, lng: 126.576667 },
    description: '싸다 싸! 신발보다 싸!',
    img: 'https://alephksa.com/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-1A__WWEN_0853ab85-adc4-47fb-8955-43df09cca9f1.jpg?v=1688733593&width=2048',
    user_id: 1,
    soldout: true,
    updated_at: '',
    users: {
      name: '최수진',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/2-25-11-73.png',
    },
  },
  {
    id: 7,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    refund: false,
    location: { lat: 33.450301, lng: 126.570667 },
    description: '싸다 싸! 신발보다 싸!',
    img: 'https://alephksa.com/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-1A__WWEN_0853ab85-adc4-47fb-8955-43df09cca9f1.jpg?v=1688733593&width=2048',
    user_id: 1,
    soldout: true,
    updated_at: '',
    users: {
      name: '노수민',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/10-35-3-253.png',
    },
  },
];

const ProductList = () => {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = productList.filter((product) =>
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
          <KakaoMap level={5} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
