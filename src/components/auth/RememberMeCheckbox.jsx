import { useState } from 'react';
import { Checkbox, Field, Label } from '@headlessui/react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { COOKIE_EXPIRE_DATE } from '../../constants/constants';

/**
 * @component RememberMeCheckbox
 * @description 사용자가 "이메일 저장" 체크박스를 통해 아이디를 기억하도록 설정하는 컴포넌트
 * @param {string} userEmail - 현재 입력된 사용자 이메일
 * @param {Function} setUserEmail - 이메일 상태를 업데이트하는 함수
 * @returns {JSX.Element} 이메일 저장 체크박스를 렌더링
 */
const RememberMeCheckbox = ({ userEmail, setUserEmail }) => {
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberUserId']);

  /**
   * 쿠키에 저장된 이메일이 있으면 체크박스를 활성화하고, 이메일 입력 필드를 업데이트
   */
  useEffect(() => {
    if (cookies.rememberUserId) {
      setIsRemember(true);
      setUserEmail(cookies.rememberUserId);
    }
  }, [cookies.rememberUserId]);

  /**
   * 체크박스 상태 변경 시 실행되는 핸들러
   * - 체크 시: 이메일을 쿠키에 저장
   * - 체크 해제 시: 쿠키에 저장된 이메일 삭제
   * @param {boolean} checked - 체크박스의 현재 상태 (true: 저장, false: 미저장)
   */
  const handleCheckboxChange = (checked) => {
    setIsRemember(checked);
    if (checked) {
      setCookie('rememberUserId', userEmail, { expires: COOKIE_EXPIRE_DATE });
    } else {
      removeCookie('rememberUserId');
    }
  };

  return (
    <Field className="flex items-center gap-2">
      <Label className="flex items-center gap-2 text-black">
        <Checkbox
          checked={isRemember}
          onChange={handleCheckboxChange}
          className="cursor-pointer group block size-4 w-5 h-5 rounded border bg-white data-[checked]:bg-deep-mint border-deep-mint outline-none"
        >
          <svg
            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
        이메일 저장
      </Label>
    </Field>
  );
};

export default RememberMeCheckbox;
