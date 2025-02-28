/* eslint-disable no-extra-boolean-cast */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authSignIn, authSignUp } from '../../api/userAuthService';
import UserInput from './UserInput';
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from '../../utils/validateUserInputs';
import { supabase } from '../../api/client';

const UserForm = () => {
  const pageParams = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const [CheckedDuplication, setCheckedDuplication] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  // 닉네임 입력값 실시간 감지 - 중복 검사에서 사용
  const userNameValue = watch('userName');

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

    const duplicated = data.length > 0;

    if (duplicated) {
      alert('이미 사용된 닉네임입니다.');
      setCheckedDuplication(false);
    } else {
      alert('사용 가능한 닉네임입니다.');
      setCheckedDuplication(true); // 중복 확인 여부 true로 변경
    }
  };

  // 닉네임 입력란에 변동이 있으면 중복 검사 상태 초기화
  useEffect(() => {
    setCheckedDuplication(false);
  }, [userNameValue]);

  const handleUserSignUp = async (userInputData) => {
    try {
      const { email, password, userName } = userInputData;

      if (!CheckedDuplication) {
        alert('닉네임 중복 확인이 필요합니다.');
        return;
      }

      const signUpData = await authSignUp(email, password, userName);

      if (!!signUpData) {
        navigate('/signin');
      }
    } catch (error) {
      if (error.message.includes('User already registered')) {
        alert('이미 존재하는 이메일입니다.');
      } else if (
        error.message.includes('Password should be at least 6 characters.')
      ) {
        alert('비밀번호는 최소 6자 이상이어야 합니다.');
      } else {
        alert('회원가입 에러 : ' + error.message);
      }

      return;
    }
  };

  const handleUserSignIn = async (userInputData) => {
    try {
      const { email, password } = userInputData;
      const userData = await authSignIn(email, password);

      if (userData) {
        navigate('/');
      }
    } catch (error) {
      if (error.message.includes('Invalid login credentials')) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
      return;
    }
  };

  const onSubmit = async (userInputData) => {
    if (pageParams === 'signup') {
      handleUserSignUp(userInputData);
    } else {
      handleUserSignIn(userInputData);
    }
  };

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
        validateFn={validateEmail}
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
          validateFn={validateUserName}
        ></UserInput>
      )}

      <UserInput
        type={'password'}
        inputTitle={'비밀번호'}
        inputName={'password'}
        register={register}
        errors={errors}
        validateFn={validatePassword}
      ></UserInput>
      <button
        type="submit"
        className="py-[8px] rounded-[8px] text-lg text-white bg-deep-mint disabled:bg-light-gray"
        disabled={!isValid || (pageParams === 'signup' && !CheckedDuplication)} // 회원가입 페이지에서는 중복 확인까지 완료해야 submit 버튼 활성화
      >
        {pageParams === 'signup' ? '회원가입' : '로그인'}
      </button>
    </form>
  );
};

export default UserForm;
