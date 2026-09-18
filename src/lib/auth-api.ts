import { apiRequest } from './api';
import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
  RegisterResponse,
  UserRole,
} from '../types/auth';

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : null;
}

function normalizeUser(value: unknown): AuthUser | undefined {
  const candidate = record(value);
  if (!candidate) return undefined;
  const id = candidate.id ?? candidate._id;
  if (typeof id !== 'string' || typeof candidate.email !== 'string') return undefined;
  const role: UserRole = candidate.role === 'admin' ? 'admin' : 'user';
  return {
    id,
    email: candidate.email,
    name: typeof candidate.name === 'string' ? candidate.name : candidate.email,
    role,
  };
}

function responseUser(value: unknown): AuthUser | undefined {
  const body = record(value);
  return normalizeUser(body?.user ?? body?.data ?? value);
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await apiRequest<unknown>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const body = record(response);
    return {
      message: typeof body?.message === 'string' ? body.message : undefined,
      user: responseUser(response),
    };
  },
  async login(payload: LoginCredentials): Promise<AuthResponse> {
    const response = await apiRequest<unknown>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const user = responseUser(response);
    if (!user) throw new Error('The server returned an invalid user profile.');
    return { user };
  },
  async logout(): Promise<void> {
    await apiRequest('/api/auth/logout', { method: 'POST' });
  },
  async me(): Promise<AuthUser> {
    const response = await apiRequest<unknown>('/api/auth/me');
    const user = responseUser(response);
    if (!user) throw new Error('The server returned an invalid user profile.');
    return user;
  },
};
