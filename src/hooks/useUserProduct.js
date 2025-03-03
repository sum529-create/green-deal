import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchWishlist,
  removeProduct,
  removeWishItem,
} from '../api/userProductService';

const useUserProduct = (user) => {
  const queryClient = useQueryClient();
  const sub = user?.id;

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ['products', sub],
    queryFn: () => fetchProducts(user),
    enabled: !!sub,
  });

  const {
    data: wishlist,
    isLoading: wishlistLoading,
    isError: wishlistError,
  } = useQuery({
    queryKey: ['wishlist', sub],
    queryFn: () => fetchWishlist(user),
    enabled: !!sub,
  });

  const { mutate: removeProductMutation } = useMutation({
    mutationFn: (productId) => removeProduct(user, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['products', sub]);
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
