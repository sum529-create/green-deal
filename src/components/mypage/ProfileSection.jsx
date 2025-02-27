import React, { useState } from 'react';
import Button from '../common/Button';

const ProfileSection = () => {
  const [nickname, setNickname] = useState('테스트닉네임');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleClick = () => {
    setIsUpdating((prev) => !prev);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-white">
      <Button
        type="button"
        variant="primary"
        size="medium"
        onClick={() => console.log('이미지 선택')}
      >
        이미지 선택
      </Button>
      <img
        src={null}
        alt="프로필 이미지"
        className="object-cover w-[130px] h-[130px] bg-light-gray rounded-full"
      />
      {isUpdating ? (
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          className="w-[210px] h-[32px] border border-dark rounded-md text-center"
        />
      ) : (
        <p className="text-title-sm">{nickname}</p>
      )}
      <p className="text-title-sm">email@example.com</p>
      <Button
        type="button"
        variant="primary"
        size="large"
        onClick={handleToggleClick}
      >
        {isUpdating ? '프로필 수정 완료' : '프로필 수정'}
      </Button>
    </div>
  );
};

export default ProfileSection;
