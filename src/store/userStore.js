import { create } from 'zustand';
import { supabase } from '../api/client';

const initialState = {
  user: null,
  isLogin: false,
};

const useUserStore = create((set) => ({
  ...initialState,
  userLogin: () => {
    try {
      const { error } = supabase.auth.onAuthStateChange((_, session) => {
        if (session) {
          set({ user: session.user, isLogin: true });
        } else {
          set(initialState);
        }

        if (error) throw error;
      });
    } catch (error) {
      console.log('로그인 에러', error);
    }
  },
  userLogOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set(initialState);
    } catch (error) {
      console.log('로그아웃 에러', error);
    }
  },
}));

export default useUserStore;
