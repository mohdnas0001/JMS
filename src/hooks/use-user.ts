// hooks/useUser.ts
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/zustand/store/authStore';

interface User {
  accessToken: string | null;
  roles: string[];
}

export const useUser = () => {
  const { accessToken, roles, setAccessToken, setRoles, clearAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('custom-auth-token');
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');

        if (!token) {
          setAccessToken(null);
          setRoles([]);
        } else {
          setAccessToken(token);
          setRoles(roles);
        }
      } catch (e) {
        console.error('Failed to load user data.', e); // Debug log
        setError('Failed to load user data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setAccessToken, setRoles]);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('custom-auth-token');
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');

      if (!token) {
        setAccessToken(null);
        setRoles([]);
      } else {
        setAccessToken(token);
        setRoles(roles);
      }
    } catch (e) {
      setError('Failed to check session.');
    }
  };

  return { user: { accessToken, roles }, error, isLoading, checkSession };
};
