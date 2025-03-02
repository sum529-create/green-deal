import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/client';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useProductDetail = (productId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.DETAIL, productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      if (error) throw error;
      return data;
    },
  });
};
