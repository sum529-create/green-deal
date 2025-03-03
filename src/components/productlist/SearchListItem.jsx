import React from 'react';

const SearchListItem = ({ product, selectedProduct, setSelectedProduct }) => {
  const handleClick = (id) => {
    setSelectedProduct(id);
  };
  return (
    <li
      className={`flex justify-between py-5 cursor-pointer group px-9 h-auto items-stretch ${selectedProduct === product.id ? 'bg-light-gray' : 'border-b border-light-gray'}`}
      onClick={() => handleClick(product.id)}
    >
      <div className="flex flex-col gap-2 pr-2">
        <span
          className={`font-bold text-lg ${selectedProduct === product.id ? 'text-light-mint' : 'group-hover:text-mint'}`}
        >
          {product.name}
        </span>

        <div className="flex items-center justify-between">
          <img
            src={product.profile_img}
            className="w-10 h-10 rounded-full bg-deep-mint"
          ></img>
          <span className="text-text-lg">{product.user_name}</span>
        </div>
      </div>
      <img src={product.img} alt="사진 없음" className="w-20 h-20 rounded-sm" />
    </li>
  );
};

export default SearchListItem;
