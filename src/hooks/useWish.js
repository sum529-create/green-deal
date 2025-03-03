import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addWish, getWishes, removeWish } from '../api/wishService';
import { QUERY_KEYS } from '../constants/queryKeys';

/**
 * useWishes
 * @description 특정 상품의 찜 목록을 가져오는 훅
 * @param {number} productId - 조회할 상품 ID
 * @returns {object} - 찜 목록 Query 객체
 */
export const useGetWishes = (productId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WISH.LIST, productId],
    queryFn: () => getWishes(productId),
    enabled: !!productId,
  });
};

/**
 * useAddWish
 * @description 특정 상품을 찜하는 훅
 * @param {number} productId - 찜할 상품 ID
 * @returns {object} - 찜 추가 Mutation 객체
 */
export const useAddWish = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId }) => addWish({ productId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.WISH.LIST, productId]);
    },
  });
};

/**
 * useRemoveWish
 * @description 특정 찜을 삭제하는 훅
 * @param {number} productId - 찜할 상품 ID
 * @returns {object} - 찜 삭제 Mutation 객체
 */
export const useRemoveWish = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (wishId) => removeWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.WISH.LIST, productId]);
    },
  });
};
