import { supabase } from './client';

// 상품 불러오기
export const fetchProducts = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 상품 삭제하기
export const removeProduct = async (userId, productId) => {
  if (!userId) return;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
};

// 찜한 상품 불러오기
export const fetchWishlist = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('wishes')
    .select('*, products(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((wishItem) => ({
    ...wishItem.products,
    wishId: wishItem.id,
  }));
};

// 찜 해제
export const removeWishItem = async (wishId) => {
  const { error } = await supabase.from('wishes').delete().eq('id', wishId);

  if (error) {
    throw new Error(error.message);
  }
};
