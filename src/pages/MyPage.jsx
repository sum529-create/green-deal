import React from 'react';
import { useState } from 'react';

const MyPage = () => {
  const [currentTab, setCurrentTab] = useState('selling');
  const [products, setProducts] = useState([
    {
      id: 1,
      product_name: '아이폰 13 팝니다.',
      product_price: '130,000',
      product_img: '',
      product_soldout: false,
    },
    {
      id: 2,
      product_name: '갤럭시 S21 팝니다.',
      product_price: '150,000',
      product_img: '',
      product_soldout: false,
    },
    {
      id: 3,
      product_name: '빌라 팝니다',
      product_price: '900,000',
      product_img: '',
      product_soldout: true,
    },
    {
      id: 4,
      product_name: '벤츠 E클래스 팝니다.',
      product_price: '800,000',
      product_img: '',
      product_soldout: false,
    },
  ]); // UI를 위해 임시로 만든 판매 물품

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
      <section className="flex flex-col items-center justify-center gap-10 w-[400px] h-[830px] p-6 bg-secondary rounded-md">
        <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-primary">
          <button className="w-[100px] h-[40px] p-2 text-primary bg-accent rounded-full text-sm">
            이미지 선택
          </button>
          <img
            src=""
            alt="프로필 이미지"
            className="object-cover w-[130px] h-[130px] bg-muted rounded-full"
          />
          <input
            type="text"
            placeholder="닉네임"
            className="w-[210px] h-[32px] border border-dark rounded-md"
          />
          <p className="mb-4">email@example.com</p>
          <button className="w-[210px] h-[60px] text-primary bg-accent rounded-full">
            프로필 수정
          </button>
        </div>

        <div className="w-[300px] h-[210px] rounded-md">
          <button
            onClick={() => handleTabChange('selling')}
            className="w-full bg-primary text-black h-[70px] rounded-t-md hover:bg-softBlue hover:text-primary"
          >
            판매 중인 물품
          </button>
          <button
            onClick={() => handleTabChange('sold')}
            className="w-full text-black bg-primary h-[70px] hover:bg-softBlue hover:text-primary"
          >
            판매 완료
          </button>
          <button
            onClick={() => handleTabChange('wishlist')}
            className="w-full text-black bg-primary h-[70px] rounded-b-md hover:bg-softBlue hover:text-primary"
          >
            찜한 상품
          </button>
        </div>
      </section>

      <section className="p-6 min-w-[800px] min-h-screen">
        <h1 className="mb-4 text-4xl font-bold text-accent">
          {currentTab === 'selling'
            ? '판매 중인 물품'
            : currentTab === 'sold'
              ? '판매 완료'
              : '찜한 상품'}
        </h1>
        <div className="grid grid-cols-3 gap-6 overflow-hidden">
          {getFilteredItems().map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md"
            >
              <img
                src={item.product_img || '/default-image.jpg'} // 이미지가 없을 경우 기본 이미지
                alt={item.product_name}
                className="object-cover w-full h-[160px] rounded-t-md bg-muted"
              />
              <div className="w-full h-[120px] p-2">
                <h3 className="text-xl font-semibold">{item.product_name}</h3>
                <p className="text-gray-500">{item.product_price}</p>
                <div className="flex items-center justify-center gap-4">
                  <button className="w-[100px] h-[40px] p-2 text-accent border-2 border-accent rounded-full">
                    삭제
                  </button>
                  <button className="w-[100px] h-[40px] p-2 text-primary bg-accent rounded-full">
                    수정
                  </button>
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
