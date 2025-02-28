import { create } from 'zustand';
import { supabase } from '../api/client';

const initialState = {
  user: null,
  isLogin: false,
};

const useUserStore = create((set) => {
  supabase.auth.onAuthStateChange((_, session) => {
    if (session) {
      set({ user: session.user, isLogin: true });
    } else {
      set(initialState);
    }
  });

  return {
    ...initialState,
  };
});

export default useUserStore;
