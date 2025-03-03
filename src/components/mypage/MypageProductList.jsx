import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const MypageProductList = ({
  products,
  wishlist,
  currentTab,
  removeProduct,
  removeWishItem,
}) => {
  const navigate = useNavigate();

  const getFilteredItems = () => {
    switch (currentTab) {
      case 'selling':
        return products.filter((item) => !item.soldout);
      case 'sold':
        return products.filter((item) => item.soldout);
      case 'wishlist':
        return wishlist;
      default:
        return [];
    }
  };

  const buttons = {
    selling: [
      { buttonName: '삭제', variant: 'outline', onClick: removeProduct },
      { buttonName: '수정', variant: 'primary', onClick: () => {} },
    ],
    sold: [{ buttonName: '삭제', variant: 'outline', onClick: removeProduct }],
    wishlist: [
      { buttonName: '찜해제', variant: 'outline', onClick: removeWishItem },
    ],
  };

  if (getFilteredItems().length === 0) {
    return <div className="text-lg">아직 아무런 상품도 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-10 overflow-hidden">
      {getFilteredItems().map((item) => (
        <article
          key={item.id}
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') return;
            navigate(`/product/detail/${item.id}`);
          }}
          className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-light-gray hover:cursor-pointer hover:shadow-lg"
        >
          <img
            src={
              item.img ||
              'https://tzmzehldetwvzvqvprsn.supabase.co/storage/v1/object/public/profileImg/profiles/1740753032690-38589.png'
            }
            alt={item.name}
            className="object-cover w-full h-[160px] rounded-t-md bg-white"
          />
          <div className="w-full h-[120px] p-2">
            <h3 className="font-semibold truncate text-title-sm">
              {item.name}
            </h3>
            <p className="mb-2 text-md text-deep-mint">{item.price}</p>
            <div className="flex items-center justify-center gap-4">
              {buttons[currentTab].map(({ buttonName, variant, onClick }) => (
                <Button
                  key={buttonName}
                  type="button"
                  variant={variant}
                  size="medium"
                  onClick={() => onClick(item.id)}
                  className={
                    currentTab === 'sold' || currentTab === 'wishlist'
                      ? 'w-full'
                      : ''
                  }
                >
                  {buttonName}
                </Button>
              ))}
            </div>
          </div>
        </article>
      ))}

      {currentTab === 'selling' && (
        <article
          className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-dashed border-light-gray cursor-pointer hover:cursor-pointer hover:shadow-lg"
          onClick={() => navigate('/product/registration')}
        >
          <div className="flex flex-col items-center justify-center w-full h-full text-deep-mint">
            <span className="text-title-md">+</span>
            <p className="mt-2 text-title-sm">물품 등록하기</p>
          </div>
        </article>
      )}
    </div>
  );
};

export default MypageProductList;
