import React from 'react';
import { useState } from 'react';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';
import TabNav from '../components/mypage/TabNav';
import MypageProductList from '../components/mypage/MypageProductList';
import useUserProduct from '../hooks/useUserProduct';

const MyPage = () => {
  const user = useUserStore((state) => state.user);
  const [currentTab, setCurrentTab] = useState('selling');
  const {
    products,
    productsLoading,
    productsError,
    wishlist,
    wishlistLoading,
    wishlistError,
    removeProductMutation,
    removeWishItemMutation,
  } = useUserProduct(user);

  if (productsLoading || wishlistLoading) {
    return <div>Loading...</div>;
  }

  if (productsError || wishlistError) {
    return <div>Error: {productsError?.message || wishlistError?.message}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen gap-14">
      <section className="flex flex-col items-center justify-center gap-10 w-[400px] h-[830px] p-6 bg-light-gray rounded-md">
        <ProfileSection user={user} />
        <TabNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </section>

      <section className="p-6 min-w-[800px] h-screen">
        <h1 className="mb-4 font-bold text-title-lg text-deep-mint">
          {currentTab === 'selling'
            ? '판매 중인 물품'
            : currentTab === 'sold'
              ? '판매 완료'
              : '찜한 상품'}
        </h1>
        <MypageProductList
          products={products}
          wishlist={wishlist}
          currentTab={currentTab}
          removeProduct={removeProductMutation}
          removeWishItem={removeWishItemMutation}
        />
      </section>
    </div>
  );
};

export default MyPage;
