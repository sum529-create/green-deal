import { useState, useEffect } from 'react';
import { supabase } from '../api/client';
import { ERROR_MESSAGES } from '../constants/mypageConstants';
import { checkNicknameDuplication, updateProfile } from '../utils/profileUtils';
import { fetchUserData } from '../api/userInfoService';

const useProfileInfo = (user) => {
  const [userdata, setUserdata] = useState(null);
  const [nickname, setNickname] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      if (!user?.id) return;

      const { data, error } = await fetchUserData(user.id);

      if (error) {
        console.error('유저 데이터 가져오기 오류:', error);
        return;
      }

      setUserdata(data);
      setNickname(data.name);
    };

    getUserData();
  }, [user]);

  // 유효성 검사 -> profileUtils로 분리하려 했지만 실패, 추후에 로직을 변경해서 분리할 예정
  const validateNickname = (nickname, userdata) => {
    if (nickname.length < 3) {
      return { valid: false, error: ERROR_MESSAGES.invalidLength };
    }

    if (nickname === userdata.name) {
      const isConfirmed = window.confirm('프로필 닉네임을 수정하겠습니까?');
      if (!isConfirmed) {
        setIsUpdating(false);
      }
      return { valid: false, error: ERROR_MESSAGES.noChange };
    }

    return { valid: true };
  };

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
    const validation = await validateNickname(nickname, userdata);
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
