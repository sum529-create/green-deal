import React from 'react';

const TabNav = ({ currentTab, setCurrentTab }) => {
  const handleTabChange = (tabType) => {
    setCurrentTab(tabType);
  };
  return (
    <div className="w-[300px] h-[210px] rounded-md">
      <button
        onClick={() => handleTabChange('selling')}
        className={`w-full h-[70px] rounded-t-md transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'selling'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
      >
        판매 중인 물품
      </button>

      <button
        onClick={() => handleTabChange('sold')}
        className={`w-full h-[70px] transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'sold'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
      >
        판매 완료
      </button>

      <button
        onClick={() => handleTabChange('wishlist')}
        className={`w-full h-[70px] rounded-b-md transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'wishlist'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
      >
        찜한 상품
      </button>
    </div>
  );
};

export default TabNav;
