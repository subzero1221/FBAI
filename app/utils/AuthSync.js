'use client';
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

import { useEffect } from 'react';
import { useUserStore } from '@/app/store/userStore';

export default function AuthSync() {
  const { user, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    async function checkToken() {
      setLoading(true);
      try {
        const res = await fetch(`${URL}/users/me`, {
          credentials: 'include',
        });
        if (!res.ok) {
          clearUser();
        }
      } catch (err) {
        clearUser();
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      checkToken();
    } else {
      setLoading(false);
    }
  }, [user, clearUser, setLoading]);

  return null; // no UI needed here
}