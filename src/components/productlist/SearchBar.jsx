import React from 'react';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import debounceInputs from '../../utils/debounceInputs';
import { useCallback } from 'react';

const SearchBar = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = useCallback(
    (value) => debounceInputs(() => setSearch(value)),
    [setSearch],
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="flex items-center p-3 m-5 overflow-hidden bg-white border-4 rounded-lg border-mint">
      <HiSearch size={24} strokeWidth={0} className="flex-shrink-0 text-mint" />
      <input
        type="text"
        className="px-2 text-black outline-none w-[95%]"
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
