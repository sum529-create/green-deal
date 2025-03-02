import Button from '../common/Button';

/**
 * @component UserInput
 * @description 사용자 입력 필드를 렌더링하는 컴포넌트
 * @param {string} type - 입력 필드의 타입 (text, password 등)
 * @param {string} inputTitle - 입력 필드의 라벨 텍스트
 * @param {string} inputName - 입력 필드의 name 속성 값
 * @param {Function} register - react-hook-form의 register 함수
 * @param {Object} errors - 유효성 검사 오류 객체
 * @param {boolean} [CheckedDuplication=false] - 닉네임 중복 확인 여부
 * @param {Function} [onClick=() => {}] - 중복 확인 버튼 클릭 핸들러
 * @param {Function} [validateFn=() => {}] - 유효성 검사 함수
 * @returns {JSX.Element} 입력 필드와 유효성 검사 메시지를 포함한 UI를 렌더링
 */
const UserInput = ({
  type,
  inputTitle,
  inputName,
  register,
  errors,
  CheckedDuplication = false,
  onClick = () => {},
  validateFn = () => {},
}) => {
  return (
    <label className="flex justify-between gap-4">
      <span className="text-lg text-deep-gray">{inputTitle}</span>
      {/* 닉네임 input일 경우 중복 확인 버튼 추가 */}
      {inputName === 'userName' && (
        <div className="relative flex items-end flex-1 max-w-[350px] gap-2 pb-6">
          <input
            type={type}
            className="w-full bg-white border-b-[1px] border-deepgray text-deep-gray focus:outline-none"
            {...register(inputName, {
              required: true,
              validate: (value) => validateFn(value),
            })}
          />
          {/* 중복 확인 여부에 따른 버튼 상태 변경 */}
          {!CheckedDuplication ? (
            <Button
              type={'button'}
              size={'small'}
              variant={'outline'}
              onClick={onClick}
            >
              중복 확인
            </Button>
          ) : (
            <Button
              type={'Button'}
              size={'small'}
              variant={'outline'}
              disabled={true}
            >
              확인 완료
            </Button>
          )}
          {/* 유효성 검사 메시지 출력 */}
          {errors[inputName] && (
            <span className="absolute bottom-0 left-0 w-full text-caption text-point-color">
              {errors[inputName]?.message}
            </span>
          )}
        </div>
      )}
      {/* 닉네임이 아닌 일반 input 필드 */}
      {inputName !== 'userName' && (
        <div className="relative flex-1 max-w-[350px] pb-6">
          <input
            type={type}
            className="w-full bg-white border-b-[1px] border-deepgray text-deep-gray focus:outline-none"
            {...register(inputName, {
              required: true,
              validate: (value) => validateFn(value),
            })}
          />
          {/* 유효성 검사 메시지 출력 */}
          {errors[inputName] && (
            <span className="absolute bottom-0 left-0 w-full text-caption text-point-color">
              {errors[inputName]?.message}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

export default UserInput;
