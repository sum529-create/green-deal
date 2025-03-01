/**
 * 이메일 유효성 검사
 */
export const validateEmail = (email) => {
  if (email && !email.includes('@')) {
    return '올바른 이메일 형식을 입력해 주세요.';
  }
};

/**
 * 닉네임 유효성 검사
 */
export const validateUserName = async (userName) => {
  if (userName && userName.length < 3) {
    return '닉네임은 최소 3글자 이상이어야 합니다.';
  }
  return true;
};

/**
 * 비밀번호 유효성 검사
 */
export const validatePassword = (password) => {
  const minLength = 6;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

  if (!password) {
    return '비밀번호를 입력해주세요.';
  }

  if (password.length < minLength) {
    return '비밀번호는 최소 6자 이상이어야 합니다.';
  }

  if (!passwordPattern.test(password)) {
    return '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
  }

  return true;
};
