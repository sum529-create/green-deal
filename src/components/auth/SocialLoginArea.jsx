import React from 'react';
import { authGoogleSignIn, authKakaoSignIn } from '../../api/userAuthService';

/**
 * @component SocialLoginArea
 * @description 구글 및 카카오 소셜 로그인 버튼을 제공하는 컴포넌트
 * @returns {JSX.Element} 카카오 및 구글 로그인 버튼을 포함한 UI를 렌더링
 */
const SocialLoginArea = () => {
  /**
   * 소셜 로그인 핸들러
   * @async
   * @param {React.MouseEvent} e - 클릭 이벤트 객체
   */
  const handleSocialLogin = async (e) => {
    const socialChannel = e.target.closest('button').getAttribute('data-type');

    if (socialChannel === 'google') {
      try {
        authGoogleSignIn();
      } catch (error) {
        alert('구글 로그인 실패 : ' + error.message);
      }
    } else if (socialChannel === 'kakao') {
      try {
        await authKakaoSignIn();
      } catch (error) {
        alert('카카오 로그인 실패 : ' + error.message);
      }
    }
  };

  return (
    <div className="flex gap-6 ">
      <button
        type="button"
        data-type="kakao"
        className="w-10 h-10 aspect-square"
        onClick={(e) => handleSocialLogin(e)}
      >
        <img
          className="w-full h-full"
          src="/icon_kakao.png"
          alt="카카오 간편 로그인"
        />
      </button>
      <button
        type="button"
        data-type="google"
        className="w-10 h-10 aspect-square"
        onClick={(e) => handleSocialLogin(e)}
      >
        <img
          className="w-full h-full"
          src="/icon_google.png"
          alt="구글 간편 로그인"
        />
      </button>
    </div>
  );
};

export default SocialLoginArea;
