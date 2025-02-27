import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { supabase } from '../../api/client';

const ProfileSection = () => {
  const [nickname, setNickname] = useState('테스트닉네임');
  const [isUpdating, setIsUpdating] = useState(false);
  const [testUser, setTestUser] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // 데이터 가져오기
  const getUserData = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error:', error);
    }
    setTestUser(data[0]);
    setNickname(data[0]?.name || '테스트닉네임');
    setImageUrl(data[0]?.profile_img || null);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 이미지 선택 후 업로드하는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    if (isUpdating) {
      // 여기에 Supabase 업데이트 로직 추가할것입니다.
      // console.log('업데이트된 닉네임:', nickname);
      // console.log('업데이트된 프로필 이미지:', imageUrl);
    }
    setIsUpdating((prev) => !prev);
  };

  // 로딩 상태 임시로 처리
  if (!testUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-white">
      <Button
        type="button"
        variant="primary"
        size="medium"
        onClick={() => document.getElementById('profile-image-input').click()} // 버튼 클릭 시 input 트리거
      >
        이미지 선택
      </Button>

      <input
        id="profile-image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <img
        src={imageUrl || null}
        alt="프로필 이미지"
        className="object-cover w-[130px] h-[130px] bg-light-gray rounded-full"
      />
      {isUpdating ? (
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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
        onClick={handleProfileUpdate}
      >
        {isUpdating ? '프로필 수정 완료' : '프로필 수정'}
      </Button>
    </div>
  );
};

export default ProfileSection;
