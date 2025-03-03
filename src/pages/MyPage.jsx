import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../api/client';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';
import TabNav from '../components/mypage/TabNav';
import MypageProductList from '../components/mypage/MypageProductList';

const MyPage = () => {
  const user = useUserStore((state) => state.user);

  const [currentTab, setCurrentTab] = useState('selling');
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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
    setProducts(data);
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
      setWishlist(wishProducts);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchWishlist();
    }
  }, [user]);

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

    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== productId),
    );
  };

  // 찜해제
  const removeWishItem = async (wishId) => {
    const { error } = await supabase.from('wishes').delete().eq('id', wishId);

    if (error) {
      console.error('찜 해제 오류:', error.message);
      return;
    }

    setWishlist((prev) => prev.filter((item) => item.wishId !== wishId));
  };

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
          removeProduct={removeProduct}
          removeWishItem={removeWishItem}
        />
      </section>
    </div>
  );
};

export default MyPage;
