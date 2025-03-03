import React from 'react';

const SearchListItem = ({ product, selectedProduct, setSelectedProduct }) => {
  const handleClick = (id) => {
    setSelectedProduct(id);
  };

  return (
    <li
      className={`relative flex px-6 py-4 cursor-pointer group h-auto items-center border-b border-light-gray ${selectedProduct === product.id ? 'bg-light-gray' : ''}`}
      onClick={() => handleClick(product.id)}
    >
      <div className="flex flex-col justify-between w-full pr-24">
        <span
          className={`mb-4 font-bold text-lg truncate max-w-[200px] ${selectedProduct === product.id ? 'text-light-mint' : 'group-hover:text-mint'}`}
        >
          {product.name}
        </span>

        <div className="flex items-center gap-2">
          <img
            src={product.profile_img}
            className="w-6 h-6 rounded-full bg-deep-mint"
            alt="프로필 이미지"
          />
          <span className="text-text-lg">{product.user_name}</span>
        </div>
      </div>

      <img
        src={product.img}
        alt="사진 없음"
        className="absolute w-20 h-20 rounded-sm right-6"
      />
    </li>
  );
};

export default SearchListItem;
