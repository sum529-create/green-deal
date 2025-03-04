import { SOCIAL_LOGIN_REDIRECT_URL } from '../constants/constants';
import { supabase } from './client';

/**
 * @function authSignUp
 * @description 사용자 회원가입 처리
 * @async
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @param {string} userName - 사용자 닉네임
 * @returns {Promise<Object>} 회원가입 성공 시 반환 데이터
 * @throws {Error} 회원가입 실패 시 오류 발생
 */
export const authSignUp = async (email, password, userName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userName,
        },
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`회원가입 실패: ${error.message}`);
  }
};

/**
 * @function authSignIn
 * @description 사용자 로그인 처리
 * @async
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise<Object>} 로그인 성공 시 반환 데이터
 * @throws {Error} 로그인 실패 시 오류 발생
 */
export const authSignIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`로그인 실패 : ${error.message}`);
  }
};

/**
 * @function authSignOut
 * @description 사용자 로그아웃 처리
 * @async
 * @throws {Error} 로그아웃 실패 시 오류 발생
 */
export const authSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`로그아웃 실패: ${error.message}`);
  }
};

/**
 * @function authGoogleSignIn
 * @description 구글 OAuth 로그인 처리
 * @async
 * @returns {Promise<Object>} 로그인 성공 시 반환 데이터
 * @throws {Error} 로그인 실패 시 오류 발생
 */
export const authGoogleSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: SOCIAL_LOGIN_REDIRECT_URL,
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`구글 로그인 실패: ${error.message}`);
  }
};

/**
 * @function authKakaoSignIn
 * @description 카카오 OAuth 로그인 처리
 * @async
 * @returns {Promise<Object>} 로그인 성공 시 반환 데이터
 * @throws {Error} 로그인 실패 시 오류 발생
 */
export const authKakaoSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: SOCIAL_LOGIN_REDIRECT_URL,
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`카카오 로그인 실패: ${error.message}`);
  }
};

/**
 * @function updateUserProfile
 * @description 로그인한 사용자의 프로필 사진을 데이터베이스에 업데이트하는 비동기 함수
 * @async
 * @returns {Promise<Object>} 프로필 사진 반영 성공 시 반환 데이터
 * @throws {Error} 프로필 사진 반영 실패 시 오류 발생
 */
export const updateUserProfile = async (session) => {
  if (!session?.user) return;

  const { id } = session.user;
  const profileImage = session.user.user_metadata.picture;

  const { error } = await supabase
    .from('users')
    .update({ profile_img: profileImage })
    .eq('user_id', id);

  if (error) console.error('프로필 업데이트 실패:', error);
};
