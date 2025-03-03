import { uploadProductImage } from '../utils/uploadProductImage';
import { supabase } from './client';

/**
 * addProduct
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
 * updateProduct
 * @description 상품 등록 서비스
 * @param {object} product
 * @param {string} userId
 * @param {number} productId
 * @returns
 */
export const updateProduct = async (product, userId, productId) => {
  // 이미지 업로드
  const file = product.img;
  let imgUrl;
  if (file.name) {
    imgUrl = await uploadProductImage(file, userId);
  } else {
    imgUrl = file;
  }
  // 새 product 객체 생성
  const updatedProduct = {
    ...product,
    img: imgUrl,
    user_id: userId,
    id: productId,
    updated_at: new Date().toISOString(),
  };
  // 상품 업데이트
  const { data, error } = await supabase
    .from('products')
    .update(updatedProduct)
    .eq('id', productId)
    .select();

  if (error) throw error;
  return { data, error };
};

/**
 * getProductDetail
 * @description 상품 상세 데이터 조회
 * @param {number} productId
 * @returns
 */
export const getProductDetail = async (productId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) throw error;
  return data;
};
