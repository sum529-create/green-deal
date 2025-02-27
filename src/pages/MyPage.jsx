import React from 'react';
import { useState } from 'react';
import Button from '../components/common/Button';

const MyPage = () => {
  const [currentTab, setCurrentTab] = useState('selling');
  const [products, setProducts] = useState([
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
      product_soldout: false,
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
      product_soldout: false,
      updated_at: '2024-02-29T12:34:56.789Z',
    },
    {
      id: 3,
      createdAt: '2024-02-27T12:38:56.789Z',
      product_name: '맥북 Aire',
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
  ]);

  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      product_name: '아이폰 133 팝니다.',
      product_price: '1,130,000',
      product_img: '',
      product_soldout: false,
    },
    {
      id: 2,
      product_name: '갤럭시 S213 팝니다.',
      product_price: '1,150,000',
      product_img: '',
      product_soldout: false,
    },
  ]); // UI를 위해 임시로 만든 찜한 상품

  const handleTabChange = (tapType) => {
    setCurrentTab(tapType);
  };

  const getFilteredItems = () => {
    switch (currentTab) {
      case 'selling':
        return products.filter((item) => !item.product_soldout);
      case 'sold':
        return products.filter((item) => item.product_soldout);
      case 'wishlist':
        return wishlist;
      default:
        return [];
    }
  };

  return (
    <div className="flex items-center justify-center h-screen gap-14">
      <section className="flex flex-col items-center justify-center gap-10 w-[400px] h-[830px] p-6 bg-light-gray rounded-md">
        <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-white">
          <Button
            type="button"
            variant="primary"
            size="medium"
            onClick={() => {
              console.log('이미지 선택 버튼이 클릭되었습니다.');
            }}
          >
            이미지 선택
          </Button>
          <img
            src={null}
            alt="프로필 이미지"
            className="object-cover w-[130px] h-[130px] bg-light-gray rounded-full"
          />
          <input
            type="text"
            placeholder="닉네임"
            className="w-[210px] h-[32px] border border-dark rounded-md text-center"
          />
          <p className="text-title-sm">email@example.com</p>
          <Button Button type="button" variant="primary" size="large">
            프로필 수정
          </Button>
        </div>

        <div className="w-[300px] h-[210px] rounded-md">
          <button
            onClick={() => handleTabChange('selling')}
            className={`w-full h-[70px] rounded-t-md transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'selling'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
          >
            판매 중인 물품
          </button>

          <button
            onClick={() => handleTabChange('sold')}
            className={`w-full h-[70px] transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'sold'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
          >
            판매 완료
          </button>

          <button
            onClick={() => handleTabChange('wishlist')}
            className={`w-full h-[70px] rounded-b-md transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'wishlist'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
          >
            찜한 상품
          </button>
        </div>
      </section>

      <section className="p-6 min-w-[800px] min-h-screen">
        <h1 className="mb-4 font-bold text-title-lg text-deep-mint">
          {currentTab === 'selling'
            ? '판매 중인 물품'
            : currentTab === 'sold'
              ? '판매 완료'
              : '찜한 상품'}
        </h1>
        <div className="grid grid-cols-3 gap-10 overflow-hidden">
          {getFilteredItems().map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-light-gray"
            >
              <img
                src={item.product_img || null} // 이미지가 없을 경우 null로 변경!
                alt={item.product_name}
                className="object-cover w-full h-[160px] rounded-t-md bg-light-gray"
              />
              <div className="w-full h-[120px] p-2">
                <h3 className="font-semibold text-title-sm">
                  {item.product_name}
                </h3>
                <p className="mb-2 text-gray-500 text-md text-deep-mint">
                  {item.product_price}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button type="button" variant="outline" size="medium">
                    삭제
                  </Button>
                  <Button type="button" variant="primary" size="medium">
                    수정
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
