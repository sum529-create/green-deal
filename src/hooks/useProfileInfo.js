import { useState, useEffect } from 'react';
import { supabase } from '../api/client';
import { ERROR_MESSAGES } from '../constants/mypageConstants';

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
      alert(ERROR_MESSAGES.notFound);
      setIsUpdating(false);
      return;
    }

    if (nickname.length < 3) {
      setErrorMessage(ERROR_MESSAGES.invalidLength);
      return;
    }

    if (nickname === userdata.name) {
      const isConfirmed = window.confirm('프로필 닉네임을 수정하겠습니까?');
      if (isConfirmed) {
        setErrorMessage(ERROR_MESSAGES.noChange);
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
      setErrorMessage(ERROR_MESSAGES.checkFailed);
      return;
    }

    if (data.length > 0) {
      setErrorMessage(ERROR_MESSAGES.duplicate);
      return;
    }

    setErrorMessage('');
    const { error } = await supabase
      .from('users')
      .update({ name: nickname })
      .eq('user_id', userdata.user_id);

    if (error) {
      console.error('프로필 업데이트 오류:', error.message);
      setErrorMessage(ERROR_MESSAGES.updateFailed);
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
