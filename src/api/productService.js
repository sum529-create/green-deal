import { uploadProductImage } from '../utils/uploadProductImage';
import { supabase } from './client';

export const getProducts = async (search = '') => {
  let data, error;

  if (search) {
    // 검색어가 있을 때: ilike로 검색
    ({ data, error } = await supabase
      .from('products_with_users')
      .select('*')
      .ilike('name', `%${search}%`)
      .limit(10));
  } else {
    // 검색어가 없을 때: 찜 개수 기준 정렬된 데이터 가져오기
    ({ data, error } = await supabase.rpc('get_products_with_wishes'));
  }

  if (error) throw new Error(error.message);

  return { data };
};

/**
 * productService
 * @description 상품 등록 서비스
 * @param {object} product - 상품 데이터
 * @param {string} userId - 사용자 ID
 * @return {Promise} - 상품 데이터
 */
export const addProduct = async (product, userId) => {
  // 이미지 업로드
  const file = product.img;
  const imgUrl = await uploadProductImage(file, userId);
  // 새 product 객체 생성
  const updatedProduct = {
    ...product,
    img: imgUrl,
    user_id: userId,
  };
  // 업데이트된 상품 데이터 업로드
  const { data, error } = await supabase
    .from('products')
    .upsert(updatedProduct)
    .select();
  if (error) throw error;
  return { data, error };
};
