import React from 'react';
import { supabase } from '../../api/client';

// 찜 상태 가져오기
const fetchLikes = async (productId) => {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .eq('product_id', productId);

  if (error) throw new Error(error.message);
  return data;
};

// 찜 하기
const addWishes = async (productId, userId) => {
  const { data, error } = await supabase
    .from('wishes')
    .insert([{ product_id: productId, user_id: userId }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

// 찜하기 취소
const removeWishes = async (wishesId) => {
  const { error } = await supabase.from('wishes').delete().eq('id', wishesId);

  if (error) throw new Error(error.message);
};

const Wishes = () => {
  return <div>Wishes</div>;
};

export default Wishes;
