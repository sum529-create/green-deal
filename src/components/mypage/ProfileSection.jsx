import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { supabase } from '../../api/client';

const ProfileSection = ({ user }) => {
  const [nickname, setNickname] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const fetchUserData = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('유저 데이터 가져오기 오류:', error.message);
    } else {
      setUserdata(data);
      setNickname(data.name);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isConfirmed = window.confirm('프로필 이미지를 수정하겠습니까?');
    if (!isConfirmed) return;

    const encodeFileName = (fileName) =>
      encodeURIComponent(fileName).replace(/[!'()*]/g, escape);
    const fileName = encodeFileName(file.name);
    const filePath = `profiles/${fileName}`;

    const { error } = await supabase.storage
      .from('test')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('이미지 업로드 오류:', error.message);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('test')
      .getPublicUrl(filePath);
    setImageUrl(urlData.publicUrl);
  };

  const handleProfileUpdate = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      return;
    }

    if (!userdata?.user_id) {
      console.error('사용자 데이터가 없습니다.', userdata);
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ name: nickname })
      .eq('user_id', userdata.user_id);

    if (error) {
      console.error('프로필 업데이트 오류:', error.message);
    } else {
      console.log('프로필 업데이트 완료!');
      await fetchUserData();
    }

    setIsUpdating(false);
  };

  if (!userdata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-white">
      <Button
        type="button"
        variant="primary"
        size="medium"
        onClick={() => document.getElementById('profile-image-input').click()}
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
        src={imageUrl || '/profile_default.png'}
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
        <p className="text-title-sm">{userdata?.name}</p>
      )}
      <p className="text-title-sm">{userdata?.email}</p>
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
