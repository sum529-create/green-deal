import { Link } from 'react-router-dom';
import UserForm from '../components/auth/UserForm';

/**
 * @component SignUp
 * @description 회원가입 페이지 컴포넌트
 * @returns {JSX.Element} 회원가입 폼을 포함한 UI를 렌더링
 */
const SignUp = () => {
  return (
    <section className="py-28 min-w-[1024px]">
      <div className="flex flex-col items-center w-3/6 max-w-lg gap-12 p-10 m-auto border-2 rounded-xl border-graish-green">
        {/* 회원가입 페이지 타이틀 */}
        <h2 className="w-full font-semibold text-left text-title-md text-darkmint">
          회원가입
        </h2>

        {/* 회원가입 폼 */}
        <UserForm />

        {/* 로그인 링크 */}
        <div className="text-sm text-deep-gray">
          계정이 있으신가요?{' '}
          <Link to={'/signin'} className="ml-1 font-semibold text-deep-mint">
            로그인
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
