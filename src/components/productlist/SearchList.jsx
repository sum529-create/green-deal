import React from 'react';
import SearchListItem from './SearchListItem';

const SearchList = ({
  filteredProducts,
  selectedProduct,
  setSelectedProduct,
}) => {
  return (
    <ul className="flex flex-col overflow-auto text-black bg-white border-t-2 border-light-gray h-[calc(100vh-166px)] ">
      {filteredProducts?.map((product) => {
        return (
          <SearchListItem
            key={product.id}
            product={product}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        );
      })}
    </ul>
  );
};

export default SearchList;
