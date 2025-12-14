import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const response = await axios.post('/api/auth/login', { email, password });
        set({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      },

      register: async (email: string, password: string, name: string) => {
        const response = await axios.post('/api/auth/register', { email, password, name });
        set({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        delete axios.defaults.headers.common['Authorization'];
      },

      isAdmin: () => {
        const state = useAuthStore.getState();
        return state.user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Initialize axios defaults if token exists
const token = localStorage.getItem('auth-storage');
if (token) {
  try {
    const parsed = JSON.parse(token);
    if (parsed.state?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.state.token}`;
    }
  } catch (e) {
    // Ignore parse errors
  }
}

