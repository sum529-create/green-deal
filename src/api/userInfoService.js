import { supabase } from './client';

/**
 * 유저 데이터 조회
 * @description 유저 ID에 맞는 정보를 조회
 * @param {string} sub - user.id
 * @returns {Promise} - 유저 데이터
 */
export const fetchUserData = async (sub) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', sub)
    .single();

  return { data, error };
};

/**
 * 닉네임 중복 체크
 * @description 주어진 닉네임이 이미 존재하는지 확인
 * @param {string} nickname - 중복을 확인할 닉네임
 * @returns {Promise} - 닉네임 데이터
 */
export const checkNickname = async (nickname) => {
  const { data, error } = await supabase
    .from('users')
    .select('name')
    .eq('name', nickname);

  return { data, error };
};
