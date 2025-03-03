import { STREETMAP_API_URL } from '../constants/constants';

/**
 * getAddressFromCoordinates
 * @description 위도, 경도로 사람이 읽을 수 있는 주소를 반환하는 함수
 * @param {number} lat - 위도
 * @param {number} lng - 경도
 * @returns {Promise<string | null>} - 변환된 주소 (실패 시 null 반환)
 */
export const getAddressFromCoordinates = async (lat, lng) => {
  const url = `${STREETMAP_API_URL}/reverse?format=json&lat=${lat}&lon=${lng}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.display_name) {
      return formatAddress(data.display_name); // 사람이 읽을 수 있는 주소 반환
    } else {
      throw new Error('주소를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Geocoding 오류:', error);
    return null;
  }
};

/**
 * formatAddress
 * @description Nominatim API에서 받은 주소를 사람이 읽기 좋은 형식으로 변환하는 함수
 * @param {string} rawAddress - Nominatim API에서 제공하는 원본 주소
 * @returns {string} - 포맷된 주소
 */
const formatAddress = (rawAddress) => {
  let addressParts = rawAddress.split(',').map((part) => part.trim());

  // 나라명 제거(우편번호 포함)
  if (/\d{5}/.test(addressParts[addressParts.length - 2])) {
    addressParts = addressParts.slice(0, -1);
  }

  // 배열을 다시 조합하여 올바른 순서로 변환
  return addressParts.reverse().join(' '); // 올바른 순서로 공백으로 결합
};
