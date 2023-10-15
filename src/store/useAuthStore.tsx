import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import produce from 'immer';
import { create } from 'zustand';

import api from '@/lib/axios';
import { removeToken, setToken } from '@/lib/cookies';
import { ApiReturn } from '@/types/api';
import { MeRespond, User } from '@/types/entities/user';

type AuthStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
  refetch: () => Promise<void>;
};

const useAuthStoreBase = create<AuthStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => {
    setToken(user.token);
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = true;
        state.user = user;
      }),
    );
  },
  logout: () => {
    removeToken();
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = false;
        state.user = null;
      }),
    );
  },
  stopLoading: () => {
    set(
      produce<AuthStoreType>((state) => {
        state.isLoading = false;
      }),
    );
  },
  refetch: async () => {
    const res = await api.get<ApiReturn<MeRespond>>('/auth/me');
    const data = res.data.data;

    set(
      produce<AuthStoreType>((state) => {
        if (state.user) {
          state.isAuthenticated = true;
          state.user = {
            ...data,
            token: state.user.token,
          };
        }
      }),
    );
  },
}));

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
