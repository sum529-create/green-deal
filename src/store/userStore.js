import { create } from 'zustand';
import { supabase } from '../api/client';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      isLocationAllowed: false,
      setUser: (user) => set({ user, isLogin: true }),
      clearUser: () => set({ user: null, isLogin: false }),
      setLocationAllowed: (isAllowed) => set({ isLocationAllowed: isAllowed }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

export const handleAuthStateChange = async () => {
  const { setUser, clearUser } = useUserStore.getState();

  const { data: unsubscribe } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        clearUser();
      }
    },
  );

  return unsubscribe;
};

export default useUserStore;
