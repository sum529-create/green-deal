import { uploadProductImage } from '../utils/uploadProductImage';
import { supabase } from './client';

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

/**
 * getProduct
 * @description 특정 상품의 상세 정보를 가져오는 서비스
 * @param {string} productId - 조회할 상품 ID
 * @returns {Promise<object>} - 상품 데이터 반환
 */
export const getProductWithSeller = async (productId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, users(*)')
    .eq('id', productId)
    .single();

  if (error) {
    console.error(`상품(${productId}) 조회 오류: `, error.message);
    return null;
  }

  if (!data) {
    console.warn(`상품(${productId})을 찾을 수 없습니다.`);
    return null;
  }

  return data;
};

/**
 * setSoldoutProduct
 * @description 특정 상품을 '판매 완료' 상태로 변경하는 서비스
 * @param {string} product_id - 판매 완료 처리할 상품 ID
 * @return {Promise<object>} - 업데이트 결과
 */
export const setSoldoutProduct = async (productId) => {
  const { data, error } = await supabase
    .from('products')
    .update({ soldout: true })
    .eq('id', productId);
  if (error) throw new Error(error.message);
};
