import React from 'react';
import { HiSearch } from 'react-icons/hi';

const SearchBar = () => {

  return (
    <div className="flex items-center p-3 overflow-hidden bg-white border-4 rounded-lg border-mint">
      <HiSearch size={24} strokeWidth={0} className="flex-shrink-0 text-mint" />
      <input
        type="text"
        className="px-2 text-black outline-none w-[95%]"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default SearchBar;
