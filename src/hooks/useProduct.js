import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import {
  addProduct,
  getProductWithSeller,
  setSoldoutProduct,
} from '../api/productService';

/**
 * useAddProduct
 * @description 상품 등록 mutation 작업을 처리하는 훅
 * @param {object} product - 상품 데이터
 * @param {number} userId - 사용자 id
 * @param {function} onSuccess
 * @returns
 */
export const useAddProduct = (product, userId, onSuccess) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => addProduct(product, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEYS.PRODUCT.LIST);
      if (onSuccess) onSuccess(data);
    },
  });
  return { mutate, isLoading, error };
};

/**
 * useProductWithSeller
 * @description 특정 상품 및 판매자 정보를 가져오는 훅
 * @param {number} productId - 조회할 상품 ID
 * @returns {object} - 상품 정보 Query 객체
 */
export const useProductWithSeller = (productId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.LIST, productId],
    queryFn: () => getProductWithSeller(productId),
  });
};

/**
 * useSoldoutProduct
 * @description 특정 상품을 '판매 완료' 상태로 변경하는 훅
 * @param {number} productId - 판매 완료 처리할 상품 ID
 * @returns {object} - 판매 완료 Mutation 객체
 */
export const useSoldoutProduct = (productId) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    // 상품을 '판매완료' 상태로 업데이트 하는 API 호출
    mutationFn: () => setSoldoutProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.PRODUCT.LIST, productId);
    },
    onError: (error) => {
      console.log('판매완료 처리 에러', error.message);
    },
  });
  return { mutate, isLoading, error };
};
