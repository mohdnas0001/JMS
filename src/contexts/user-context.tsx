'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import type { User } from '@/types/user';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState({ user: null, error: 'Something went wrong', isLoading: false });
        return;
      }

      setState({ user: data ?? null, error: null, isLoading: false });
    } catch (err) {
      logger.error(err);
      setState({ user: null, error: 'Something went wrong', isLoading: false });
    }
  }, []);

  useEffect(() => {
    checkSession().catch((err: unknown) => logger.error(err));
  }, [checkSession]);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
