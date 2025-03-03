import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchWishlist,
  removeProduct,
  removeWishItem,
} from '../api/userProductService';
import { QUERY_KEYS } from '../constants/queryKeys';

const useUserProduct = (sub) => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.LIST, sub],
    queryFn: () => fetchProducts(sub),
    enabled: !!sub,
  });

  const {
    data: wishlist,
    isLoading: wishlistLoading,
    isError: wishlistError,
  } = useQuery({
    queryKey: ['wishlist', sub], //'wishlist'는 추후 변경
    queryFn: () => fetchWishlist(sub),
    enabled: !!sub,
  });

  const { mutate: removeProductMutation } = useMutation({
    mutationFn: (productId) => removeProduct(sub, productId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCT.LIST, sub]);
    },
  });

  const { mutate: removeWishItemMutation } = useMutation({
    mutationFn: (wishId) => removeWishItem(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist', sub]);
    },
  });
  return {
    products,
    productsLoading,
    productsError,
    wishlist,
    wishlistLoading,
    wishlistError,
    removeProductMutation,
    removeWishItemMutation,
  };
};

export default useUserProduct;
