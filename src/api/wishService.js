import useUserStore from '../store/userStore';
import { supabase } from './client';

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
