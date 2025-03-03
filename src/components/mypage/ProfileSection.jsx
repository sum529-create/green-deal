import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import ProfileImage from './ProfileImage';
import useProfileInfo from '../../hooks/useProfileInfo';
import useProfileImage from '../../hooks/useProfileImage';

const ProfileSection = ({ user }) => {
  const [nickname, setNickname] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { userdata, handleProfileUpdate, error, reset } = useProfileInfo(user);
  const { imageUrl, handleImageChange } = useProfileImage(userdata);

  useEffect(() => {
    if (userdata?.name) {
      setNickname(userdata.name);
    }
  }, [userdata?.name]);

  const handleUpdateClick = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      reset();
      return;
    }

    const result = await handleProfileUpdate(nickname, isUpdating);

    // 닉네임이 변경되지 않는 경우를 처리하기 위해
    if (result?.unchanged) {
      setIsUpdating(false);
      return;
    }

    if (result?.success) {
      setIsUpdating(false);
      alert('프로필이 성공적으로 업데이트되었습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-white">
      <ProfileImage imageUrl={imageUrl} handleImageChange={handleImageChange} />

      {isUpdating ? (
        <>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value.trim());
              reset();
            }}
            className="w-[210px] h-[32px] border border-dark rounded-md text-center"
          />
          {error && (
            <p className="mt-1 text-text-sm text-point-color">
              {error.message}
            </p>
          )}
        </>
      ) : (
        <p className="text-title-sm">{userdata?.name ?? '닉네임'}</p>
      )}

      <p className="text-title-sm">{userdata?.email ?? '이메일'}</p>

      <Button
        type="button"
        variant="primary"
        size="large"
        onClick={handleUpdateClick}
      >
        {isUpdating ? '프로필 수정 완료' : '프로필 수정'}
      </Button>
    </div>
  );
};

export default ProfileSection;
