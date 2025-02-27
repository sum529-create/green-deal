/* eslint-disable no-extra-boolean-cast */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { handleUserLogin, handleUserSignUp } from '../../api/userAuthService';
import UserInput from './UserInput';
import useDebouncedValidation from '../../hooks/useDebouncedValidation';
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from '../../utils/validateUserInputs';
import { supabase } from '../../api/client';
import useUserStore from '../../store/userStore';

const UserForm = () => {
  const pageParams = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const [isDuplicatedName, setIsDuplicatedName] = useState(false);
  const [CheckedDuplication, setCheckedDuplication] = useState(false);
  const userLogin = useUserStore((state) => state.userLogin);

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

  // debounce validation
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

  const onSubmit = async (data) => {
    if (pageParams === 'signup') {
      // 회원가입 로직
      const { email, password, userName } = data;
      const signUpData = await handleUserSignUp(
        email,
        password,
        userName,
        CheckedDuplication,
      );

      if (!!signUpData) {
        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        navigate('/signin');
      }
    } else {
      // 로그인 로직
      const { email, password } = data;
      const loginData = await handleUserLogin(email, password);

      if (loginData?.error) {
        if (loginData.error === 'Invalid login credentials') {
          setError('email', {
            type: 'manual',
            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          });
          setError('password', {
            type: 'manual',
            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          });
        }
        return;
      }

      alert('로그인 성공!');
      userLogin();
      navigate('/');
    }
  };

  // 닉네임 중복 확인
  const onHandleDuplication = async () => {
    if (!userNameValue || userNameValue.length < 3) {
      alert('닉네임은 3글자 이상이어야 합니다.');
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('name')
      .eq('name', userNameValue); // 특정 닉네임이 존재하는지 확인

    if (error) {
      console.error('닉네임 확인 오류:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
      return;
    }
    setIsDuplicatedName(data.length > 0); // DB 내 중복된 이름이 있는지

    if (isDuplicatedName) {
      alert('이미 사용된 닉네임입니다.');
      setCheckedDuplication(false);
    } else {
      alert('사용 가능한 닉네임입니다.');
      setCheckedDuplication(true); // 중복 확인 여부 true로 변경
    }
  };

  useEffect(() => {
    setIsDuplicatedName(false); // 닉네임 인풋이 수정되면 모든 중복 여부 false로 전환
    setCheckedDuplication(false);
  }, [userNameValue]);

  return (
    <form
      action="#"
      className="flex flex-col w-full gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <UserInput
        type={'text'}
        inputTitle={'이메일'}
        inputName={'email'}
        register={register}
        errors={errors}
      ></UserInput>

      {/* 회원가입 페이지 일 경우에만 닉네임 input 노출 */}
      {pageParams === 'signup' && (
        <UserInput
          type={'text'}
          inputTitle={'닉네임'}
          inputName={'userName'}
          register={register}
          errors={errors}
          CheckedDuplication={CheckedDuplication}
          onClick={onHandleDuplication}
        ></UserInput>
      )}

      <UserInput
        type={'password'}
        inputTitle={'비밀번호'}
        inputName={'password'}
        register={register}
        errors={errors}
      ></UserInput>
      <button
        type="submit"
        className="py-[8px] rounded-[8px] text-lg text-white bg-deep-mint"
      >
        {pageParams === 'signup' ? '회원가입' : '로그인'}
      </button>
    </form>
  );
};

export default UserForm;
