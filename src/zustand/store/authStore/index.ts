// store/authStore.ts
import create from 'zustand';

interface AuthState {
  accessToken: string | null;
  roles: string[];
  setAccessToken: (token: string | null) => void;
  setRoles: (roles: string[]) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('custom-auth-token') || null,
  roles: JSON.parse(localStorage.getItem('roles') || '[]'),
  setAccessToken: (token) => {
    localStorage.setItem('custom-auth-token', token || '');
    set({ accessToken: token });
  },
  setRoles: (roles) => {
    localStorage.setItem('roles', JSON.stringify(roles));
    set({ roles });
  },
  clearAuth: () => {
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('roles');
    set({ accessToken: null, roles: [] });
  },
}));
