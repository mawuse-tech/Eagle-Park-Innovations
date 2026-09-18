'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/src/lib/auth-api';
import type { AuthState, AuthUser, LoginCredentials, RegisterPayload, RegisterResponse } from '@/src/types/auth';

interface AuthContextValue extends AuthState {
  login(credentials: LoginCredentials): Promise<AuthUser>;
  register(payload: RegisterPayload): Promise<RegisterResponse>;
  logout(): Promise<void>;
  refreshUser(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const sessionCheckStarted = useRef(false);
  const [user, setUser] = useState<AuthState['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      setUser(await authApi.me());
    } catch {
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    // React Strict Mode replays effects in development; check the session only once.
    if (sessionCheckStarted.current) return;
    sessionCheckStarted.current = true;
    // Discard the legacy Bearer credential; all new sessions use HttpOnly cookies.
    try { window.localStorage.removeItem('eagleParkAuthToken'); } catch { /* Storage may be disabled. */ }
    queueMicrotask(() => void refreshUser());
  }, [refreshUser]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    setUser(response.user);
    return response.user;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    clearSession();
    router.replace('/login');
    router.refresh();
  }, [clearSession, router]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register: authApi.register,
    logout,
    refreshUser,
  }), [user, isLoading, login, logout, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}
