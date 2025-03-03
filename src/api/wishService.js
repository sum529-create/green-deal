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
 * 찜 해제
 * @description wish ID로 찜 해제
 * @param {number} wishId - 찜한 상품의 ID
 */
export const removeWishItem = async (wishId) => {
  const { error } = await supabase.from('wishes').delete().eq('id', wishId);

  if (error) {
    throw new Error('찜 해제 오류:', error.message);
  }
};
