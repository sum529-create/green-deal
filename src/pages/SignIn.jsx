import React from 'react';
import UserForm from '../components/auth/UserForm';
import { Link } from 'react-router-dom';
import SocialLoginArea from '../components/auth/SocialLoginArea';

/**
 * @component SignIn
 * @description 로그인 페이지 컴포넌트
 * @returns {JSX.Element} 로그인 폼과 소셜 로그인 옵션을 포함한 UI를 렌더링
 */
const SignIn = () => {
  return (
    <section className="py-28 min-w-[1024px]">
      <div className="flex flex-col items-center w-3/6 max-w-lg gap-12 p-10 m-auto border-2 rounded-xl border-graish-green">
        {/* 로그인 페이지 타이틀 */}
        <h2 className="w-full font-semibold text-left text-title-md text-darkmint">
          로그인
        </h2>

        {/* 로그인 폼 */}
        <UserForm />

        {/* 구분선 */}
        <span className="relative items-center flex gap-2 w-full before:block text-gray text-title-sm before:h-[1px] before:bg-gray before:w-full after:block after:h-[1px] after:bg-gray after:w-full">
          OR
        </span>

        {/* 소셜 로그인 영역 */}
        <SocialLoginArea />

        {/* 회원가입 링크 */}
        <div className="text-sm text-deep-gray">
          계정이 없으신가요?{' '}
          <Link to={'/signup'} className="ml-1 font-semibold text-deep-mint">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
