import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
        // Initialize axios headers after hydration
        const currentState = get();
        if (currentState.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${currentState.token}`;
        }
      },

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
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        if (state?.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        }
      },
    }
  )
);

