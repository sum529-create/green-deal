import { useState, useEffect } from 'react';
import { supabase } from '../api/client';
import { ERROR_MESSAGES } from '../constants/mypageConstants';
import {
  validateNickname,
  checkNicknameDuplication,
  updateProfile,
} from './profileUtils';

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
      setErrorMessage('');
      return;
    }

    if (!userdata?.user_id) {
      alert(ERROR_MESSAGES.notFound);
      setIsUpdating(false);
      return;
    }

    // 유효성 검사
    const validation = validateNickname(nickname, userdata);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      return;
    }

    // 닉네임 중복 검사
    const duplicationCheck = await checkNicknameDuplication(nickname);
    if (!duplicationCheck.valid) {
      setErrorMessage(duplicationCheck.error);
      return;
    }

    // 프로필 업데이트
    const result = await updateProfile(nickname, userdata);
    if (result.success) {
      setIsUpdating(false);
      await fetchUserData();
      alert('프로필이 성공적으로 업데이트되었습니다.');
    } else {
      setErrorMessage(result.error);
    }
  };

  return {
    userdata,
    nickname,
    setNickname,
    isUpdating,
    errorMessage,
    handleProfileUpdate,
    fetchUserData,
  };
};

export default useProfileInfo;
