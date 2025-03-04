import { supabase } from './client';

/**
 * 유저가 찜한 상품 목록 조회
 * @description 유저의 ID에 해당하는 찜한 목록을 가져오며 최신순 정렬
 * @param {string} sub - user.id
 * @returns {Promise} - 해당 유저가 찜한 상품 목록
 */
export const getMyWishlist = async (sub) => {
  //getMyWishlist로 변경
  const { data, error } = await supabase
    .from('wishes')
    .select('*, products(*)')
    .eq('user_id', sub)
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

/**
 * 찜 상태 가져오기
 * @param {number} productId - 조회할 상품 ID
 * @returns {Promise<Array>} - 찜한 목록 데이터
 */
export const getWishes = async (productId) => {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .eq('product_id', productId);

  if (error) throw new Error(error.message);
  return data;
};

/**
 * 찜 추가
 * @param {number} productId - 찜할 상품 ID
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Object>} - 추가된 찜 데이터
 */
export const addWish = async ({ productId, userId }) => {
  const { data, error } = await supabase
    .from('wishes')
    .insert([{ product_id: productId, user_id: userId }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * 찜 삭제
 * @param {number} wishId - 삭제할 찜 ID
 * @returns {Promise<void>}
 */
export const removeWish = async (wishId) => {
  const { error } = await supabase.from('wishes').delete().eq('id', wishId);

  if (error) throw new Error(error.message);
};
