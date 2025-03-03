import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { addProduct, getProducts } from '../api/productService';

/**
 * useGetProduct
 * @description 상품 정보를 가져오는 query 작업을 수행하는 훅
 * @param {String} search - 검색어
 * @returns
 */
export const useGetProducts = (search = '') => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.LIST, search],
    queryFn: () => getProducts(search),
  });
};

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
