import { useQuery } from '@tanstack/react-query';
import { getAddressFromCoordinates } from '../utils/getAddress';

/**
 * useGeocode
 * @description 위도, 경도로 주소 변환하는 커스텀 훅
 * @param {number} lat - 위도
 * @param {number} lng - 경도
 * @returns {object} - { data, isLoading, error }
 */
export const useGeocode = (lat, lng) => {
  return useQuery({
    queryKey: ['geocode', lat, lng],
    queryFn: () => getAddressFromCoordinates(lat, lng),
    enabled: !!lat && !!lng, // lat, lng 값이 있을 때만 실행
  });
};
