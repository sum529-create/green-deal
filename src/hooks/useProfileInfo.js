import {
  checkNicknameDuplication,
  updateProfile,
  validateNickname,
} from '../utils/profileUtils';
import { fetchUserData } from '../api/userInfoService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { QUERY_KEYS } from '../constants/queryKeys';

const useProfileInfo = (user) => {
  const queryClient = useQueryClient();
  const [localError, setLocalError] = useState(null);

  // 유저 데이터 조회
  const { data: userdata } = useQuery({
    queryKey: ['user', user?.id], //QUERY_KEYS.USER를 하면 적용이 안됨
    queryFn: () => fetchUserData(user.id),
    enabled: !!user?.id,
    select: (data) => data.data,
  });

  // 프로필 업데이트
  const updateProfileMutation = useMutation({
    mutationFn: (newNickname) => updateProfile(newNickname, userdata),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', user?.id]);
    },
  });

  // 닉네임 중복 검사
  const checkNicknameMutation = useMutation({
    mutationFn: checkNicknameDuplication,
  });

  // 프로필 업데이트 핸들러
  const handleProfileUpdate = async (nickname, isUpdating) => {
    if (!isUpdating) return { isUpdating: true };

    setLocalError(null);

    // 유효성 검사
    const validation = validateNickname(nickname, userdata?.name);
    if (!validation.valid) {
      if (validation.isUnchanged) {
        return { unchanged: true };
      }
      setLocalError(new Error(validation.error));
      return;
    }

    // 닉네임 중복 검사
    try {
      await checkNicknameMutation.mutateAsync(nickname);
    } catch (error) {
      setLocalError(error);
      return;
    }

    // 프로필 업데이트
    try {
      await updateProfileMutation.mutateAsync(nickname);
    } catch (error) {
      setLocalError(error);
      return;
    }

    return { success: true };
  };

  return {
    userdata,
    handleProfileUpdate,
    error:
      localError || checkNicknameMutation.error || updateProfileMutation.error,
  };
};

export default useProfileInfo;
