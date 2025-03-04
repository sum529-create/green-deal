import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyWishlist, removeWishItem } from '../api/wishService';

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
    queryKey: ['wishlist', sub], //'wishlist'는 추후 변경
    queryFn: () => getMyWishlist(sub),
    enabled: !!sub,
  });

  const { mutate: removeWishItemMutation } = useMutation({
    mutationFn: (wishId) => removeWishItem(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist', sub]);
    },
  });

  return {
    wishlist,
    wishlistLoading,
    wishlistError,
    removeWishItemMutation,
  };
};
