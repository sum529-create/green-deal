import React from 'react';
import SearchListItem from './SearchListItem';
import { useRef } from 'react';
import { useEffect } from 'react';

const SearchList = ({
  filteredProducts,
  selectedProduct,
  setSelectedProduct,
  fetchNextPage,
  hasNextPage,
}) => {
  const loadRef = useRef(null);

  useEffect(() => {
    if (!loadRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });

    observer.observe(loadRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <ul className="flex flex-col overflow-auto text-black bg-white border-t border-light-gray h-[calc(100vh-166px)] ">
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
      <div ref={loadRef} />
    </ul>
  );
};

export default SearchList;
