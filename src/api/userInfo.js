import { supabase } from './client';
/**
 * 특정 사용자 정보를 가져오는 함수
 *
 * @async
 * @param {string} sub - 사용자 ID (user_id)
 * @returns {Promise<Object>} 사용자 데이터 객체
 * @throws {Error} 유저 정보를 불러오는 데 실패한 경우 예외 발생
 */
export const getUserData = async (sub) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', sub)
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`유저 정보 불러오기 실패: ${error.message}`);
  }
};
