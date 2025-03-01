import { useState } from 'react';
import { INITIAL_ADD_PRODUCT_DATA } from '../constants/productConstants';
import useUserStore from '../store/userStore';
import { productService } from '../service/productService';
import { useMutation } from '@tanstack/react-query';

/**
 * useProductRegistration
 * @description - 상품 등록 훅
 * @param {function} onSuccess - 성공 시 콜백 함수
 * @param {function} onError - 실패 시 콜백 함수
 * @returns {object} - 상품 등록 관련 데이터
 */
export const useProductRegistration = (onSuccess, onError) => {
  const [product, setProduct] = useState(INITIAL_ADD_PRODUCT_DATA);
  const user = useUserStore((state) => state.user);
  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => productService(product, user.id),
    onSuccess,
    onError,
  });

  const handleImageChange = (newImg) => {
    setProduct((value) => ({
      ...value,
      img: newImg,
    }));
  };
  const handleProductChange = (product) => {
    setProduct((value) => ({
      ...value,
      ...product,
    }));
  };

  const handleSubmit = () => mutate();

  return {
    product,
    error,
    isLoading,
    handleImageChange,
    handleProductChange,
    handleSubmit,
  };
};
