export const DEBOUNCE_TIME = '500';
export const SOCIAL_LOGIN_REDIRECT_URL = `${window.location.origin}/products`;
export const MODE = {
  PRODUCTLIST: 'productList',
  LOCATIONPICKER: 'locationPicker',
};

/**
 * 쿠키 만료일 (현재 날짜로부터 7일 후)
 * @constant {Date} COOKIE_EXPIRE_DATE
 */
export const COOKIE_EXPIRE_DATE = new Date();
COOKIE_EXPIRE_DATE.setDate(COOKIE_EXPIRE_DATE.getDate() + 7);

// 도로명 주소변환 URL
export const STREETMAP_API_URL = 'https://nominatim.openstreetmap.org';
