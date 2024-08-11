'use client';

import { baseUrl } from '@/constants/config';
import { useAuthStore } from '@/zustand/store/authStore';

import type { User } from '@/types/user';

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string; roles?: string[] }> {
    const { email, password } = params;
    const setAccessToken = useAuthStore.getState().setAccessToken;
    const setRefreshToken = useAuthStore.getState().setRefreshToken;
    const setRoles = useAuthStore.getState().setRoles;

    try {
      const response = await fetch(`${baseUrl}/v1/auth/login/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message };
      }

      const data = await response.json();
      const { accessToken, refreshToken, roles } = data;

      // Save accessToken, refreshToken, and roles in Zustand store
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setRoles(roles);

      return { roles };
    } catch (error) {
      console.error('SignInWithPassword Error:', error);
      return { error: 'Network error' };
    }
  }

  async getUser(): Promise<{ data: User | null; error: string | null }> {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return { data: null, error: 'No token found' };
    }

    try {
      const response = await fetch(`${baseUrl}/v1/auth/session`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { data: null, error: errorData.message };
      }

      const data = await response.json();
      return { data: data.user as User, error: null };
    } catch (error) {
      console.error('GetUser Error:', error);
      return { data: null, error: 'Failed to fetch user' };
    }
  }

  // New method to refresh the access token using the refresh token
  async refreshAccessToken(): Promise<{ accessToken?: string; error?: string }> {
    const refreshToken = useAuthStore.getState().refreshToken;
    const setAccessToken = useAuthStore.getState().setAccessToken;

    if (!refreshToken) {
      return { error: 'No refresh token found' };
    }

    try {
      const response = await fetch(`${baseUrl}/v1/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message };
      }

      const data = await response.json();
      const { accessToken } = data;

      setAccessToken(accessToken);

      return { accessToken };
    } catch (error) {
      console.error('RefreshAccessToken Error:', error);
      return { error: 'Failed to refresh token' };
    }
  }
}

export const authClient = new AuthClient();
