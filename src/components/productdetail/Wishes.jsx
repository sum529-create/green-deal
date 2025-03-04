import React from 'react';
import { supabase } from '../../api/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../store/userStore';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useState } from 'react';

// 찜 상태 가져오기
const fetchWishes = async (productId) => {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .eq('product_id', productId);

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
    data: wishes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wishes', productId],
    queryFn: () => fetchWishes(productId),
  });

  // 로그인한 유저가 찜한 상태인지 확인 / 로그인하지 않은경우 기본 false
  const isWished = currentUser?.id
    ? wishes.some((wish) => wish.user_id === currentUser.id)
    : false;

  // 찜 하기
  const { mutate: addWishMutation } = useMutation({
    mutationFn: () => addWish(productId, currentUser.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishes', productId],
      });
    },
  });

  // 찜하기 취소
  const { mutate: removeWishMutation } = useMutation({
    mutationFn: (wishId) => removeWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishes', productId],
      });
    },
  });

  // 찜하기/해제 토글
  const handleWishToggle = () => {
    if (!currentUser) {
      alert('로그인 후 이용할 수 있습니다.');
      return;
    }
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
        <FaRegStar
          style={{
            fill: '#55CCC9',
          }}
          className="text-2xl cursor-pointer hover:scale-125"
        />
      ) : (
        <FaStar className="text-2xl cursor-pointer text-mint hover:scale-125" />
      )}
    </button>
  );
};

export default Wishes;
