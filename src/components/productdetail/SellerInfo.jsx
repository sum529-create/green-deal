import React from 'react';

const SellerInfo = ({ seller }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={seller?.profile_img}
        alt={seller?.name}
        className="w-10 h-10 bg-gray-300 rounded-full"
      />
      <span className="text-gray-700">{seller?.name}</span>
    </div>
  );
};

export default SellerInfo;
