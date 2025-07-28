import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      loading: true,
      language: (typeof window !== 'undefined' && localStorage.getItem('language')) || 'en',

      setUser: (userData) =>
        set({
          user: {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
            tokens:userData.tokens,
          },
          loading: false,
        }),

        setUserAvatar: (avatar) =>
          set((state) => ({
            user: {
              ...state.user,
              avatar,
            },
          })),

          updateTokens: (tokens)=>
            set((state)=> ({
              user:{
                ...state.user,
                tokens
              }
            })),

      clearUser: () => set({ user: null, loading: false }),
      setLoading: (value) => set({ loading: value }),
      setLanguage: (lang) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('language', lang);
        }
        set({ language: lang });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);