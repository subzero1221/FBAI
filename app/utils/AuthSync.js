'use client';
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

import { useEffect } from 'react';
import { useUserStore } from '@/app/store/userStore';

export default function AuthSync() {
  const { setUser, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    async function checkToken() {
      setLoading(true);
      try {
        const res = await fetch(`${URL}/users/me`, {
          credentials: 'include',
        });

        if (!res.ok) {
          clearUser();
          return;
        }

        const data = await res.json();
        setUser(data.data.user); // ✅ save fresh user
      } catch (err) {
        clearUser();
      } finally {
        setLoading(false);
      }
    }

    checkToken(); // 🔥 always run on mount
  }, [setUser, clearUser, setLoading]);

  return null;
}
