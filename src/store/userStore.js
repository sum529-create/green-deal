import { create } from 'zustand';
import { supabase } from '../api/client';

const useUserStore = create((set) => ({
  user: null,
  isLogin: false,
  setUser: (user) => set({ user, isLogin: !!user }),
  resetUser: () => set({ user: null, isLogin: false }),
}));

export const handleAuthStateChange = async () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      useUserStore.setState({ user: session.user, isLogin: true });
    } else if (event === 'SIGNED_OUT') {
      useUserStore.setState({ user: null, isLogin: false });
    }
  });
};

export default useUserStore;
