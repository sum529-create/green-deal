import React from 'react';

const SearchList = ({ filteredProducts }) => {
  return (
    <div className="flex flex-col bg-white">
      {filteredProducts?.map((product) => {
        return (
          <div className="flex justify-between py-5 border-b-2 px-9 border-light-gray">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-title-sm">
                {product.product_name}
              </span>
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 border-2 rounded-full border-light-gray bg-light-gray"></div>
                <span className="text-text-lg">판매자 이름</span>
              </div>
            </div>
            <img
              src={product.product_img === '' ? 'https://placehold.co/150' : ''}
              alt="사진 없음"
              className="w-20 h-20"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SearchList;
