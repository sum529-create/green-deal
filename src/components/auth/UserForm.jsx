/* eslint-disable no-extra-boolean-cast */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { authSignIn, authSignUp } from '../../api/userAuthService';
import UserInput from './UserInput';
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from '../../utils/validateUserInputs';
import useUserStore from '../../store/userStore';
import RememberMeCheckbox from './RememberMeCheckbox';
import { checkNickname } from '../../api/userInfoService';

/**
 * @component UserForm
 * @description 로그인 및 회원가입을 위한 사용자 입력 폼 컴포넌트
 * @returns {JSX.Element} 이메일, 닉네임(회원가입 시), 비밀번호 입력 필드를 포함한 폼을 렌더링
 */
const UserForm = () => {
  const pageParams = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [CheckedDuplication, setCheckedDuplication] = useState(false);
  const [cookies] = useCookies(['rememberUserId']);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: cookies.rememberUserId || '' },
  });

  const userEmailValue = watch('email');
  const userNameValue = watch('userName');

  /**
   * 닉네임 중복 확인
   * @async
   */
  const onHandleDuplication = async () => {
    if (!userNameValue || userNameValue.length < 3) {
      alert('닉네임은 3글자 이상이어야 합니다.');
      return;
    }
    const { data, error } = await checkNickname(userNameValue);

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

  /**
   * 닉네임 입력값이 변경될 때 중복 검사 상태 초기화
   */
  useEffect(() => {
    setCheckedDuplication(false);
  }, [userNameValue]);

  /**
   * 회원가입 처리
   * @async
   * @param {Object} userInputData - 사용자 입력 데이터
   */
  const handleUserSignUp = async (userInputData) => {
    try {
      const { email, password, userName } = userInputData;

      if (!CheckedDuplication) {
        alert('닉네임 중복 확인이 필요합니다.');
        return;
      }

      const signUpData = await authSignUp(email, password, userName);

      if (!!signUpData) {
        navigate('/');
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

  /**
   * 로그인 처리
   * @async
   * @param {Object} userInputData - 사용자 입력 데이터
   */
  const handleUserSignIn = async (userInputData) => {
    try {
      const { email, password } = userInputData;
      const userData = await authSignIn(email, password);

      if (userData) {
        setUser(userData.session.user);
        navigate('/');
      }
    } catch (error) {
      if (error.message.includes('Invalid login credentials')) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
      return;
    }
  };

  /**
   * 폼 제출 핸들러
   * @async
   * @param {Object} userInputData - 사용자 입력 데이터
   */
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

      {/* 로그인 페이지 일 경우에만 이메일 저장 체크박스 노출 */}
      {pageParams === 'signin' && (
        <RememberMeCheckbox
          userEmail={userEmailValue}
          setUserEmail={(email) => setValue('email', email)}
        />
      )}
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
