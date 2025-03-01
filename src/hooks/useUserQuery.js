import { useQuery } from '@tanstack/react-query';
import { getAuthData } from '../api/userAuthService';

/**
 * 사용자 데이터를 가져오는 React Query 훅
 *
 * @returns {<Object>}
 * - `data`: 사용자 데이터
 * - `isPending`: 데이터 로딩 중 여부
 */
export const useUserData = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAuthData,
  });
};
