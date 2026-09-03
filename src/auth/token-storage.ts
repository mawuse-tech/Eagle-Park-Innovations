const TOKEN_KEY = 'eagleParkAuthToken';

export const tokenStorage = {
  get(): string | null {
    return typeof window === 'undefined' ? null : window.localStorage.getItem(TOKEN_KEY);
  },
  set(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
  },
  clear(): void {
    if (typeof window !== 'undefined') window.localStorage.removeItem(TOKEN_KEY);
  },
};
