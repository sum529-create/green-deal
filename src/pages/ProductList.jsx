import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';

const productList = [
  {
    id: 1,
    createdAt: '2024-02-27T12:34:56.789Z',
    name: '아이폰11',
    category: '디지털기기',
    price: '10000',
    quality: '최상',
    refund: false,
    location: { lat: 37.5558858, lng: 126.9176464 },
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
    location: { lat: 37.5576954, lng: 126.9206567 },
    description: '사용감 살짝 있습니다!',
    img: '',
    user_id: 2,
    soldout: true,
    updated_at: '2024-02-29T12:34:56.789Z',
  },
  {
    id: 3,
    createdAt: '2024-02-27T12:38:56.789Z',
    name: '맥북 Aire',
    category: '디지털기기',
    price: '1000000',
    quality: '최상',
    refund: false,
    location: { lat: 37.5539707, lng: 126.9198014 },
    description: '개봉만 했습니다.',
    img: '',
    user_id: 1,
    soldout: true,
    updated_at: '',
  },
];
const ProductList = () => {
  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="w-full p-4 md:w-1/4 bg-mint">
        <p className="font-bold text-title-lg">검색</p>
      </div>
      <div className="flex flex-col w-full md:w-3/4">
        <span className="p-4 text-2xl">지금 우리 동네 인기 매물 TOP 20</span>
        <div className="flex-grow full min-h-[400px]">
          <KakaoMap level={5} mode={'productList'} productList={productList} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
