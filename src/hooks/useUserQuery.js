import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchUserData,
  updateProfileImage,
  uploadProfileImage,
} from '../api/userInfoService';
import { QUERY_KEYS } from '../constants/queryKeys';
import { useState } from 'react';
import {
  checkNicknameDuplication,
  updateProfile,
  validateNickname,
} from '../utils/profileUtils';
import {
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  PRODUCT_DEFAULT_IMG,
} from '../constants/mypageConstants';

/**
 * 특정 사용자의 데이터를 가져오는 React Query 훅
 *
 * @param {string} sub - 사용자 ID (user_id), 없으면 요청 실행 안 함
 * @returns {<Object>}
 * - `data`: 사용자 정보 데이터
 * - `isPending`: 데이터 로딩 중 여부
 * - `error`: 오류 발생 시 해당 오류 객체
 */
export const useUserData = (sub) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, sub],
    queryFn: async () => {
      const response = await fetchUserData(sub);
      return response.data;
    },
    enabled: !!sub,
  });
};

export const useProfileInfo = (user) => {
  const queryClient = useQueryClient();
  const [localError, setLocalError] = useState(null);

  // 유저 데이터 조회
  const { data: userdata } = useUserData(user?.id); //useUseData 사용

  // 프로필 업데이트
  const updateProfileMutation = useMutation({
    mutationFn: (newNickname) => updateProfile(newNickname, userdata),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER, user?.id]);
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
    await checkNicknameMutation.mutateAsync(nickname);

    // 프로필 업데이트
    await updateProfileMutation.mutateAsync(nickname);

    return { success: true };
  };

  return {
    userdata,
    handleProfileUpdate,
    error:
      localError || checkNicknameMutation.error || updateProfileMutation.error,
  };
};

export const useProfileImage = (userdata) => {
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: uploadProfileImage,
  });

  const updateProfileImageMutation = useMutation({
    mutationFn: (imageUrl) => updateProfileImage(imageUrl, userdata.user_id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER, userdata?.user_id]);
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('2MB 이하의 파일을 선택해주세요.');
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert('JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
    }

    uploadImageMutation.mutate(file, {
      onSuccess: (imageUrl) => {
        updateProfileImageMutation.mutate(imageUrl);
      },
    });
  };

  return {
    imageUrl: userdata?.profile_img || PRODUCT_DEFAULT_IMG,
    handleImageChange,
  };
};
