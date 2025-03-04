import { BUCKET_NAME, PROFILES_DIRECTORY } from '../constants/mypageConstants';
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

/**
 * 프로필 닉네임 업데이트
 * @param {string} newNickname
 * @param {string} userId - 사용자 ID
 * @returns
 */
export const updateProfileNickname = async (newNickname, userId) => {
  const { error } = await supabase
    .from('users')
    .update({ name: newNickname })
    .eq('user_id', userId);

  return { error };
};

/**
 * 프로필 이미지 업로드
 * @param {File} file - 업로드할 이미지 파일
 * @returns
 */
export const uploadProfileImage = async (file) => {
  const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.${file.name.split('.').pop()}`;
  const filePath = `${PROFILES_DIRECTORY}/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, { upsert: false });

  const { data: urlData } = await supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};

/**
 * 프로필 이미지 업데이트
 * @param {string} imageUrl - 업로드된 이미지 URL
 * @param {string} userId - 유저 ID
 * @returns
 */
export const updateProfileImage = async (imageUrl, userId) => {
  const { error } = await supabase
    .from('users')
    .update({ profile_img: imageUrl })
    .eq('user_id', userId);

  return { error };
};
