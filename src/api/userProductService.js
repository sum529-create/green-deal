import { supabase } from './client';

// 상품 불러오기
export const fetchProducts = async (user) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error('상품 데이터 가져오기 오류:', error.message);
  }
  return data;
};

//찜한 상품 불러오기
export const fetchWishlist = async (user) => {
  const { data, error } = await supabase
    .from('wishes')
    .select('*, products(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('찜한 상품 데이터 가져오기 오류:', error.message);
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
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error('상품 삭제 오류:', error.message);
  }
};

// 찜해제
export const removeWishItem = async (wishId) => {
  const { error } = await supabase.from('wishes').delete().eq('id', wishId);

  if (error) {
    throw new Error('찜 해제 오류:', error.message);
  }
};
