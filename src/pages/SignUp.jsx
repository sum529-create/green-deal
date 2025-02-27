import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from '../utils/validateUserInputs';
import useDebouncedValidation from '../hooks/useDebouncedValidation';
import { handleUserSignUp } from '../api/userAuthService';

const SignUp = () => {
  const {
    register, // onChange 등의 이벤트 객체 생성
    handleSubmit, // form onSubmit에 들어가는 함수
    watch, // register를 통해 받은 모든 값 확인
    formState: { errors }, // errors: register의 에러 메세지 자동 출력
    setError,
    clearErrors,
  } = useForm();

  // 각 입력값 실시간 감지
  const emailValue = watch('email');
  const userNameValue = watch('userName');
  const passwordValue = watch('password');

  useDebouncedValidation(
    () => validateEmail(emailValue, setError, clearErrors),
    [emailValue],
  );
  useDebouncedValidation(
    () => validateUserName(userNameValue, setError, clearErrors),
    [userNameValue],
  );
  useDebouncedValidation(
    () => validatePassword(passwordValue, setError, clearErrors),
    [passwordValue],
  );

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log('email =====>', email);
    console.log('password =====>', password);
    handleUserSignUp(email, password);
  };

  return (
    <section className="py-40">
      <div className="flex flex-col items-center w-3/5 max-w-lg gap-12 p-10 m-auto">
        <h2 className="w-full text-4xl text-left text-accent">로그인</h2>
        <form
          action=""
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            <span>이메일</span>
            <input
              type="text"
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </label>
          <label>
            <span>닉네임</span>
            <input type="text" {...register('userName', { required: true })} />
            {errors.userName && <span>{errors.userName.message}</span>}
          </label>
          <label>
            <span>비밀번호</span>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </label>
          <button>회원가입</button>
        </form>
        <span>OR</span>
        <div>소셜로그인</div>
        <div>
          계정이 있으신가요? <Link to={'/signin'}>로그인</Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
