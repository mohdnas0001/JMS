import create from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;  // Add refreshToken to the state
  roles: string[];
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;  // Add a setter for refreshToken
  setRoles: (roles: string[]) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('custom-auth-token') || null,
  refreshToken: localStorage.getItem('refresh-token') || null,  // Get the refreshToken from localStorage
  roles: JSON.parse(localStorage.getItem('roles') || '[]'),
  
  setAccessToken: (token) => {
    localStorage.setItem('custom-auth-token', token || '');
    set({ accessToken: token });
  },
  
  setRefreshToken: (token) => {  // Implement the setRefreshToken method
    localStorage.setItem('refresh-token', token || '');
    set({ refreshToken: token });
  },

  setRoles: (roles) => {
    localStorage.setItem('roles', JSON.stringify(roles));
    set({ roles });
  },
  
  clearAuth: () => {
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('refresh-token');  // Clear the refreshToken from localStorage
    localStorage.removeItem('roles');
    set({ accessToken: null, refreshToken: null, roles: [] });  // Reset the refreshToken in the state
  },
}));
