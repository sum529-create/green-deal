import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { supabase } from '../../api/client';

const ProfileSection = ({ user }) => {
  const [nickname, setNickname] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // console.log(userdata);

  //유저 데이터 가져오기
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
      setImageUrl(data.profile_img || '/profile_default.png');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  // 파일명 생성 함수(한글이 포함된 파일도 업로드하기 위해)
  const getFileName = (file) => {
    const extension = file.name.slice(file.name.lastIndexOf('.') + 1); // 확장자만(png)
    const randomName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.${extension}`; // 최대한 중복없게
    return randomName;
  };

  // 프로필 이미지 변경
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isConfirmed = window.confirm('프로필 이미지를 수정하겠습니까?');
    if (!isConfirmed) return;

    const fileName = getFileName(file);
    const filePath = `profiles/${fileName}`;

    // 이미지 업로드
    const { error } = await supabase.storage
      .from('profileImg')
      .upload(filePath, file, { upsert: false });

    if (error) {
      console.error('이미지 업로드 오류:', error.message);
      alert('프로필 이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    // URL 만들기
    const { data: urlData, error: urlError } = await supabase.storage
      .from('profileImg')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('URL 가져오기 오류:', urlError.message);
      alert('URL 가져오기 실패');
      return;
    }
    const newImageUrl = urlData.publicUrl;
    setImageUrl(newImageUrl);

    // 유저 프로필 이미지 업데이트
    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_img: newImageUrl })
      .eq('user_id', userdata.user_id);

    if (updateError) {
      console.error('프로필 이미지 업데이트 오류:', updateError.message);
      alert('프로필 이미지 업데이트에 실패했습니다. 다시 시도해주세요.');
    } else {
      console.log('프로필 이미지 업데이트 완료!');
      await fetchUserData();
      alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
    }
  };

  // 프로필 정보 수정
  const handleProfileUpdate = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      return;
    }

    if (!userdata?.user_id) {
      console.error('사용자 데이터가 없습니다.', userdata);
      setIsUpdating(false);
      return;
    }

    // 닉네임 유효성 검사 (3~15자)
    if (nickname.length < 3 || nickname.length > 15) {
      alert('닉네임은 3~15자 사이여야 합니다.');
      setIsUpdating(false);
      return;
    }

    // 닉네임이 변경되지 않았다면 업데이트하지 않음
    if (nickname === userdata.name) {
      alert('닉네임이 변경되지 않았습니다.');
      setIsUpdating(false);
      return;
    }

    // 닉네임 중복 검사
    const { data, error: checkError } = await supabase
      .from('users')
      .select('name')
      .eq('name', nickname);

    if (checkError) {
      console.error('닉네임 중복 검사 오류:', checkError);
      alert('중복 검사 중 오류가 발생했습니다.');
      setIsUpdating(false);
      return;
    }

    if (data.length > 0) {
      alert('이미 사용 중인 닉네임입니다.');
      setIsUpdating(false);
      return;
    }

    // 닉네임 업데이트 진행
    const { error } = await supabase
      .from('users')
      .update({ name: nickname })
      .eq('user_id', userdata.user_id);

    if (error) {
      console.error('프로필 업데이트 오류:', error.message);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    } else {
      console.log('프로필 업데이트 완료!');
      await fetchUserData();
      alert('프로필이 성공적으로 업데이트되었습니다.');
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
