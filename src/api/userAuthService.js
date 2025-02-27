import { supabase } from './client';

export const handleUserSignUp = async (email, password, userName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   data: {
      //     user_name: userName,
      //     user_profile_img: '/profile_default.png',
      //   },
      // },
    });
    console.log('data =====>', data);
    console.log('error =====>', error);
  } catch (err) {
    console.log('err =====>', err);
  }
};
