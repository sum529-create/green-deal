import React from 'react';
import { useState } from 'react';
import { supabase } from '../api/client';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';
import TabNav from '../components/mypage/TabNav';
import MypageProductList from '../components/mypage/MypageProductList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const MyPage = () => {
  const user = useUserStore((state) => state.user);
  const [currentTab, setCurrentTab] = useState('selling');

  const queryClient = useQueryClient();

  // 상품 불러오기
  const fetchProducts = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('상품 데이터 가져오기 오류:', error.message);
      return;
    }
    return data;
  };

  //찜한 상품 불러오기
  const fetchWishlist = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from('wishes')
      .select('*, products(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('찜한 상품 데이터 가져오기 오류:', error.message);
      return;
    }

    if (data) {
      const wishProducts = data.map((wishItem) => ({
        ...wishItem.products,
        wishId: wishItem.id,
      }));
      return wishProducts;
    }
  };

  //상품 삭제하기
  const removeProduct = async (productId) => {
    if (!user?.id) {
      return;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
      .eq('user_id', user.id);

    if (error) {
      console.error('상품 삭제 오류:', error.message);
      return;
    }
  };

  // 찜해제
  const removeWishItem = async (wishId) => {
    const { error } = await supabase.from('wishes').delete().eq('id', wishId);

    if (error) {
      console.error('찜 해제 오류:', error.message);
      return;
    }
  };

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ['products', user?.id],
    queryFn: fetchProducts,
    enabled: !!user?.id,
  });

  const {
    data: wishlist,
    isLoading: wishlistLoading,
    isError: wishlistError,
  } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: fetchWishlist,
    enabled: !!user?.id,
  });

  const { mutate: removeProductMutation } = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products', user?.id]);
    },
  });

  const { mutate: removeWishItemMutation } = useMutation({
    mutationFn: removeWishItem,
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
