import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addWish,
  getMyWishlist,
  getWishes,
  removeWish,
} from '../api/wishService';
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
 * useAddWish Optimistic-Update
 * @description 특정 상품을 찜하는 훅
 * @param {number} productId - 찜할 상품 ID
 * @returns {object} - 찜 추가 Mutation 객체
 */
export const useAddWish = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId }) => addWish({ productId, userId }),

    onMutate: async (variables) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries([QUERY_KEYS.WISH.LIST, productId]);
      // 현재 상태 저장 (Snapshot)
      const prevWish = queryClient.getQueryData([
        QUERY_KEYS.WISH.LIST,
        productId,
      ]);
      // UI 즉시 반영
      queryClient.setQueryData([QUERY_KEYS.WISH.LIST, productId], (old) => [
        ...old,
        {
          id: Date.now(), // 임시 ID, 실제 서버에서 반환되는 값으로 대체됨
          product_id: productId,
          user_id: variables.userId,
        },
      ]);
      return { prevWish };
    },
    // 에러시 롤백
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.WISH.LIST, productId],
        context.prevWish,
      );
    },
    // 최종 서버 데이터 동기화
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.WISH.LIST, productId]);
    },
  });
};

/**
 * useRemoveWish Optimistic-Update
 * @description 특정 찜을 삭제하는 훅
 * @param {number} productId - 찜할 상품 ID
 * @returns {object} - 찜 삭제 Mutation 객체
 */
export const useRemoveWish = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (wishId) => removeWish(wishId),
    onMutate: async (wishId) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries([QUERY_KEYS.WISH.LIST, productId]);
      // 현재 상태 저장 (Snapshot)
      const prevWish = queryClient.getQueryData([
        QUERY_KEYS.WISH.LIST,
        productId,
      ]);
      // 취소 UI 즉시 반영
      queryClient.setQueryData([QUERY_KEYS.WISH.LIST, productId], (old) =>
        old.filter((wish) => wish.id !== wishId),
      );
      return { prevWish };
    },
    // 에러시 롤백
    onError: (err, wishId, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.WISH.LIST, productId],
        context.prevWish,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.WISH.LIST, productId]);
    },
  });
};

/**
 * useUserWishlist
 * @description 유저의 찜 목록을 가져오는 훅
 * @param {string} sub - user.id
 * @returns {object}
 */
export const useUserWishlist = (sub) => {
  const queryClient = useQueryClient();

  const {
    data: wishlist,
    isLoading: wishlistLoading,
    isError: wishlistError,
  } = useQuery({
    queryKey: [QUERY_KEYS.WISH.LIST, sub],
    queryFn: () => getMyWishlist(sub),
    enabled: !!sub,
  });

  return {
    wishlist,
    wishlistLoading,
    wishlistError,
  };
};
