import { useState, useEffect } from 'react';
import { supabase } from '../api/client';

const useProfileInfo = (user) => {
  const [userdata, setUserdata] = useState(null);
  const [nickname, setNickname] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserData = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('유저 데이터 가져오기 오류:', error.message);
      return;
    }

    setUserdata(data);
    setNickname(data.name);
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleProfileUpdate = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      return;
    }

    if (!userdata?.user_id) {
      alert('사용자 정보를 찾을 수 없습니다.');
      setIsUpdating(false);
      return;
    }

    if (nickname.length < 3 || nickname.length > 15) {
      setErrorMessage('닉네임은 3~15자 사이여야 합니다.');
      return;
    }

    if (nickname === userdata.name) {
      const isConfirmed = window.confirm('프로필 닉네임을 수정하겠습니까?');
      if (isConfirmed) {
        setErrorMessage('닉네임이 변경되지 않았습니다.');
        return;
      } else {
        setIsUpdating(false);
        return;
      }
    }

    // 닉네임 중복 검사
    const { data, error: checkError } = await supabase
      .from('users')
      .select('name')
      .eq('name', nickname);

    if (checkError) {
      console.error('닉네임 중복 검사 오류:', checkError);
      setErrorMessage('중복 검사 중 오류가 발생했습니다.');
      return;
    }

    if (data.length > 0) {
      setErrorMessage('이미 사용 중인 닉네임입니다.');
      return;
    }

    setErrorMessage('');
    const { error } = await supabase
      .from('users')
      .update({ name: nickname })
      .eq('user_id', userdata.user_id);

    if (error) {
      console.error('프로필 업데이트 오류:', error.message);
      setErrorMessage('프로필 업데이트 중 오류가 발생했습니다.');
      return;
    }

    alert('프로필이 성공적으로 업데이트되었습니다.');
    setIsUpdating(false);
    await fetchUserData();
  };

  return {
    userdata,
    nickname,
    setNickname,
    isUpdating,
    errorMessage,
    handleProfileUpdate,
    fetchUserData, // 필요하면 외부에서 호출할 수 있도록 반환
  };
};

export default useProfileInfo;
