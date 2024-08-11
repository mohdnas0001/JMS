import { useEffect, useState } from 'react';
import { useAuthStore } from '@/zustand/store/authStore';
import { authClient } from '@/lib/auth/client';

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
      const storedToken = localStorage.getItem('custom-auth-token');
      const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]');

      if (!storedToken) {
        clearAuth();
        setIsLoading(false);
        return;
      }

      try {
        const response = await authClient.getUser();

        if (response.error) {
          const refreshResponse = await authClient.refreshAccessToken();

          if (refreshResponse.error) {
            clearAuth();
            setError(refreshResponse.error);
          } else {
            setAccessToken(localStorage.getItem('custom-auth-token'));
            setRoles(storedRoles);
          }
        } else {
          setAccessToken(storedToken);
          setRoles(storedRoles);
        }
      } catch (e) {
        console.error('Failed to load user data.', e);
        setError('Failed to load user data.');
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setAccessToken, setRoles, clearAuth]);

  const checkSession = async () => {
    const storedToken = localStorage.getItem('custom-auth-token');
    const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]');

    if (!storedToken) {
      clearAuth();
      return;
    }

    try {
      const response = await authClient.getUser();

      if (response.error) {
        const refreshResponse = await authClient.refreshAccessToken();

        if (refreshResponse.error) {
          clearAuth();
          setError(refreshResponse.error);
        } else {
          setAccessToken(localStorage.getItem('custom-auth-token'));
          setRoles(storedRoles);
        }
      } else {
        setAccessToken(storedToken);
        setRoles(storedRoles);
      }
    } catch (e) {
      console.error('Failed to check session.', e);
      setError('Failed to check session.');
      clearAuth();
    }
  };

  return { user: { accessToken, roles }, error, isLoading, checkSession };
};
