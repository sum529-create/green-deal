import { supabase } from './client';

export const fetchUserData = async (userId) => {
  if (!userId) return { data: null, error: '유효하지 않은 사용자 ID' };

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
};

export const checkNickname = async (nickname) => {
  const { data, error } = await supabase
    .from('users')
    .select('name')
    .eq('name', nickname);

  return { data, error };
};
