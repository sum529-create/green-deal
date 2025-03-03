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
/**
 * 로그인한 유저의 상품 목록 조회
 * @description 유저의 ID에 해당하는 상품 목록을 가져오며 최신순 정렬
 * @param {string} sub - user.id
 * @returns {Promise} - 해당 유저의 상품 목록
 */
export const getMyProducts = async (sub) => {
  //getMyProducts로 변경
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', sub)
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error('상품 데이터 가져오기 오류:', error.message);
  }
  return data;
};

/**
 * 상품 삭제
 * @description 상품 ID와 유저 ID로 상품 삭제
 * @param {string} sub - user.id
 * @param {number} productId - 삭제할 상품의 ID
 */
export const removeProduct = async (sub, productId) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('user_id', sub);

  if (error) {
    throw new Error('상품 삭제 오류:', error.message);
  }
};
