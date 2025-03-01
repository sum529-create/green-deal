import Button from '../common/Button';

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
      {/* 닉네임 input이라면 중복 확인 버튼 추가 */}
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
          {errors[inputName] && (
            <span className="absolute bottom-0 left-0 w-full text-caption text-point-color">
              {errors[inputName]?.message}
            </span>
          )}
        </div>
      )}
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
