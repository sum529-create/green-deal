import React from 'react';

const TabNav = ({ currentTab, setCurrentTab }) => {
  const handleTabChange = (tabType) => {
    setCurrentTab(tabType);
  };

  const tabs = [
    { value: 'selling', tabName: '판매 중인 물품', rounded: 'rounded-t-md' },
    { value: 'sold', tabName: '판매 완료', rounded: '' },
    { value: 'wishlist', tabName: '찜한 상품', rounded: 'rounded-b-md' },
  ];

  return (
    <div className="w-[300px] h-[210px] rounded-md">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={`w-full h-[70px] transition-colors text-title-sm hover:opacity-80 text-left pl-5 ${tab.rounded} ${
            currentTab === tab.value
              ? 'bg-graish-green text-white'
              : 'bg-white text-black'
          }`}
        >
          {tab.tabName}
        </button>
      ))}
    </div>
  );
};

export default TabNav;
