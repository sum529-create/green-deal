import debounceInputs from './debounceInputs';

/**
 * 이메일 유효성 검사
 */
export const validateEmail = (email, setError, clearErrors) =>
  debounceInputs(() => {
    if (email && !email.includes('@')) {
      setError('email', { message: '올바른 이메일 형식을 입력해 주세요.' });
    } else {
      clearErrors('email');
    }
  });

/**
 * 닉네임 유효성 검사
 */
export const validateUserName = (userName, setError, clearErrors) =>
  debounceInputs(() => {
    if (userName && userName.length < 3) {
      setError('userName', { message: '닉네임은 최소 3자 이상이어야 합니다.' });
    } else {
      clearErrors('userName');
    }
  });

/**
 * 비밀번호 유효성 검사
 */
export const validatePassword = (password, setError, clearErrors) =>
  debounceInputs(() => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    if (password && !passwordPattern.test(password)) {
      setError('password', {
        message:
          '비밀번호는 영문, 숫자, 특수문자를 최소 1개 이상 포함해야 합니다.',
      });
    } else {
      clearErrors('password');
    }
  });
