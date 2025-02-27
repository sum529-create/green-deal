import { supabase } from './client';

export const handleUserSignUp = async (
  email,
  password,
  userName,
  CheckedDuplication,
) => {
  if (!CheckedDuplication) {
    alert('닉네임 중복 확인이 필요합니다.');
    return;
  }

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

    // supabase 인증 관련 에러
    if (error) {
      switch (error.code) {
        case 'user_already_exists':
          alert('이미 존재하는 이메일입니다.');
          return;
        case 'weak_password':
          alert('보안에 취약한 비밀번호입니다.');
          return;
        default:
          console.log(`회원가입 에러 : ${error.code}`);
      }
    }

    return data;
  } catch (err) {
    console.log('회원가입 에러 =====>', err);
  }
};

export const handleUserLogin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message }; // 로그인 실패 시 error 메시지 반환
  }

  return { data }; // 로그인 성공 시 data 반환
};
