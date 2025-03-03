import { supabase } from './client';

// 상품 불러오기
export const fetchProducts = async (user) => {
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
export const fetchWishlist = async (user) => {
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
export const removeProduct = async (user, productId) => {
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
export const removeWishItem = async (wishId) => {
  const { error } = await supabase.from('wishes').delete().eq('id', wishId);

  if (error) {
    console.error('찜 해제 오류:', error.message);
    return;
  }
};
