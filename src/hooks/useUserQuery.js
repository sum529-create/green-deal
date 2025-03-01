import { useQuery } from '@tanstack/react-query';
import { getAuthData } from '../api/userAuthService';
import { getUserData } from '../api/userInfo';

/**
 * 사용자 인증 데이터를 가져오는 React Query 훅
 *
 * @returns {<Object>}
 * - `data`: 인증된 사용자 데이터
 * - `isPending`: 데이터 로딩 중 여부
 * - `error`: 오류 발생 시 해당 오류 객체
 */
export const useAuthData = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthData,
  });
};

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
    queryKey: ['user', sub],
    queryFn: () => getUserData(sub),
    enabled: !!sub,
  });
};
