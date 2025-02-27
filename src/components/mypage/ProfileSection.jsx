import React, { useState } from 'react';
import Button from '../common/Button';
import { supabase } from '../../api/client';
import { useEffect } from 'react';

const ProfileSection = () => {
  const [nickname, setNickname] = useState('테스트닉네임');
  const [isUpdating, setIsUpdating] = useState(false);
  const [testUser, setTestUser] = useState(null);

  const getUserData = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('User data:', data);
    }
    setTestUser(data[0]);
  };
  useEffect(() => {
    getUserData();
  }, []);

  console.log('test user:', testUser);

  if (!testUser) {
    return <div>Loading...</div>;
  }

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
        src={testUser.profile_img || null}
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
        <p className="text-title-sm">{testUser.name}</p>
      )}
      <p className="text-title-sm">{testUser.email}</p>
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
