/**
 * 사용자의 현재 위치(위도 및 경도)를 가져오는 함수
 * 
 * @returns {Promise<{ lat: number, lng: number }>} 
 * 사용자의 위치 정보를 객체 형태로 반환하는 Promise
 * 
 * @throws {Error} Geolocation을 지원하지 않는 경우 에러 발생
 * @throws {PositionError} 위치 정보를 가져오는 데 실패한 경우 에러 발생 
*/
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          reject(error);
        },
      );
    } else {
      reject(new Error('Geolocation을 지원하지 않는 브라우저입니다.'));
    }
  });
};
