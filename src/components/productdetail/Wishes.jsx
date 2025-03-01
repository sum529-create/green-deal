import React from 'react';
import { supabase } from '../../api/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../store/userStore';
import { FaRegStar, FaStar } from 'react-icons/fa';

// 찜 상태 가져오기
const fetchWishes = async (productId, userId) => {
  const { data, error } = await supabase
    .from('wishes')
    .select('*, users(*)')
    .eq('product_id', productId)
    .eq('user_id', userId); // 로그인한 사용자만 필터링

  if (error) throw new Error(error.message);
  return data;
};

// 찜 하기
const addWish = async (productId, userId) => {
  const { data, error } = await supabase
    .from('wishes')
    .insert([{ product_id: productId, user_id: userId }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

// 찜하기 취소
const removeWish = async (wishId) => {
  const { error } = await supabase.from('wishes').delete().eq('id', wishId);

  if (error) throw new Error(error.message);
};

const Wishes = ({ productId }) => {
  const queryClient = useQueryClient();
  const currentUser = useUserStore((state) => state.user);

  // 찜 상태 가져오기
  const {
    data: wishes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wishes', productId, currentUser.id],
    queryFn: () => fetchWishes(productId, currentUser.id),
  });

  // 찜 하기
  const { mutate: addWishMutation } = useMutation({
    mutationFn: () => addWish(productId, currentUser.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishes', productId, currentUser.id],
      });
    },
  });

  // 찜하기 취소
  const { mutate: removeWishMutation } = useMutation({
    mutationFn: (wishId) => removeWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishes', productId, currentUser.id],
      });
    },
  });

  // 찜하기 여부확인
  // const isWished = wishes?.some((wish) => wish.user_id === currentUser.id);
  const isWished = wishes && wishes?.length > 0;

  // 찜하기/해제 토글
  const handleWishToggle = () => {
    if (isWished) {
      const wishToRemove = wishes.find(
        (wish) => wish.user_id === currentUser.id,
      );
      removeWishMutation(wishToRemove.id);
    } else {
      addWishMutation();
    }
  };

  return (
    <button onClick={handleWishToggle}>
      {!isWished ? (
        <FaRegStar className="text-2xl text-gray-500 cursor-pointer hover:text-mint" />
      ) : (
        <FaStar className="text-2xl cursor-pointer text-mint hover:scale-125" />
      )}
    </button>
  );
};

export default Wishes;
