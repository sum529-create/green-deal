import React from 'react';
import { useState } from 'react';
import { supabase } from '../api/client';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';
import TabNav from '../components/mypage/TabNav';
import MypageProductList from '../components/mypage/MypageProductList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchWishlist,
  removeProduct,
  removeWishItem,
} from '../api/userProductService';

const MyPage = () => {
  const user = useUserStore((state) => state.user);
  const [currentTab, setCurrentTab] = useState('selling');

  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ['products', user?.id],
    queryFn: () => fetchProducts(user),
    enabled: !!user?.id,
  });

  const {
    data: wishlist,
    isLoading: wishlistLoading,
    isError: wishlistError,
  } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: () => fetchWishlist(user),
    enabled: !!user?.id,
  });

  const { mutate: removeProductMutation } = useMutation({
    mutationFn: (productId) => removeProduct(user, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['products', user?.id]);
    },
  });

  const { mutate: removeWishItemMutation } = useMutation({
    mutationFn: (wishId) => removeWishItem(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist', user?.id]);
    },
  });

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
