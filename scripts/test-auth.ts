import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import nextEnv from '@next/env';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { connectDatabase } from '../src/server/db';
import { User } from '../src/server/models/User';

nextEnv.loadEnvConfig(process.cwd());
const base = process.env.AUTH_TEST_URL || 'http://localhost:3000';
const marker = randomUUID();
const email = `migration-user-${marker}@example.invalid`;
const adminEmail = `migration-admin-${marker}@example.invalid`;
const password = randomUUID();
let checks = 0;
function check(value: unknown, message: string): asserts value { assert.ok(value, message); checks++; }
async function request(path: string, method = 'GET', body?: unknown, cookie?: string, headers: Record<string, string> = {}) {
  return fetch(`${base}${path}`, { method, redirect: 'manual', headers: { 'Content-Type': 'application/json', Origin: new URL(base).origin, ...(cookie ? { Cookie: cookie } : {}), ...headers }, ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
}
function cookie(response: Response) { return response.headers.get('set-cookie')?.split(';')[0] || ''; }
function provision() {
  return spawnSync(process.execPath, ['--conditions=react-server', '--import', 'tsx', 'scripts/create-admin.ts'], {
    env: { ...process.env, ADMIN_NAME: 'Migration test admin', ADMIN_EMAIL: adminEmail, ADMIN_PASSWORD: password }, encoding: 'utf8', timeout: 30000,
  });
}
try {
  const [connection, sameConnection] = await Promise.all([connectDatabase(), connectDatabase()]);
  check(connection === sameConnection, 'Concurrent connections must reuse Mongoose');
  check(mongoose.connection.name === 'eagle_park_ecommerce', 'Must retain the existing database');
  const existing = await User.findOne();
  console.log(existing ? 'Existing users are available (identities withheld).' : 'No existing users were found.');
  check((await request('/api/auth/me')).status === 401, 'Anonymous me');
  check((await request('/api/admin')).status === 401, 'Anonymous admin');
  check((await request('/api/auth/register', 'POST', { name: 'Test', email, password: 'short' })).status === 400, 'Short password');
  check((await request('/api/auth/register', 'POST', { name: 'Test', email, password }, undefined, { Origin: 'https://other.example' })).status === 403, 'Cross-origin registration');
  const registration = await request('/api/auth/register', 'POST', { name: 'Migration test', email, password, role: 'admin' });
  check(registration.status === 201, 'Registration');
  const registered = await registration.json();
  check(registered.user.role === 'user' && !('password' in registered.user), 'Safe user and ignored admin input');
  check((await request('/api/auth/register', 'POST', { name: 'Test', email: email.toUpperCase(), password })).status === 409, 'Duplicate email');
  const stored = await User.findOne({ email }).select('+password');
  check(stored && stored.password.startsWith('$2b$12$') && await stored.comparePassword(password), 'Preserved bcrypt hashing');
  check(!('password' in stored.toJSON()), 'Model serialization excludes password');
  check((await request('/api/auth/login', 'POST', { email, password: 'wrong-password' })).status === 401, 'Incorrect password');
  const login = await request('/api/auth/login', 'POST', { email, password });
  check(login.status === 200, 'Login');
  const result = await login.json();
  check(!('token' in result) && !('password' in result.user), 'No credentials in response');
  const setCookie = login.headers.get('set-cookie') || '';
  check(setCookie.includes('HttpOnly') && setCookie.includes('SameSite=lax') && setCookie.includes('Expires='), 'Persistent HttpOnly cookie');
  const userCookie = cookie(login);
  check((await request('/api/auth/me', 'GET', undefined, userCookie)).status === 200, 'Current user');
  check((await request('/api/auth/me', 'GET', undefined, userCookie)).status === 200, 'Session reused across requests');
  check((await request('/api/admin', 'GET', undefined, userCookie)).status === 403, 'Normal user rejected');
  check((await request('/api/auth/me', 'GET', undefined, 'eagle_park_session=invalid')).status === 401, 'Invalid token');
  const expired = jwt.sign({ userId: stored.id }, process.env.JWT_SECRET!, { expiresIn: -1 });
  check((await request('/api/auth/me', 'GET', undefined, `eagle_park_session=${expired}`)).status === 401, 'Expired token');
  check((await request('/api/auth/me', 'GET', undefined, undefined, { Authorization: `Bearer ${userCookie.split('=')[1]}` })).status === 401, 'Legacy Bearer rejected');
  const created = provision();
  check(created.status === 0 && !created.stdout.includes(password) && !created.stderr.includes(password), 'Admin script');
  check(provision().status === 1, 'Admin duplicate protection');
  const adminLogin = await request('/api/auth/login', 'POST', { email: adminEmail, password });
  check(adminLogin.status === 200, 'Admin login');
  const adminCookie = cookie(adminLogin);
  check((await request('/api/admin', 'GET', undefined, adminCookie)).status === 200, 'Admin authorization');
  check((await request('/admin', 'GET', undefined, adminCookie)).status === 200, 'Admin page');
  await User.updateOne({ email: adminEmail }, { role: 'user' });
  check((await request('/api/admin', 'GET', undefined, adminCookie)).status === 403, 'Role changes take effect without new JWT');
  check((await request('/admin', 'GET', undefined, userCookie)).status === 307, 'Server rejects customer admin page');
  check((await request('/admin')).status === 307, 'Server rejects anonymous admin page');
  check((await request('/api/auth/logout', 'POST', undefined, userCookie, { Origin: 'https://other.example' })).status === 403, 'Logout CSRF protection');
  const logout = await request('/api/auth/logout', 'POST', undefined, userCookie);
  check(logout.status === 200 && (logout.headers.get('set-cookie') || '').includes('Max-Age=0'), 'Logout expires cookie');
  check((await request('/api/auth/me', 'GET', undefined, cookie(logout))).status === 401, 'Logged out current user');
  for (const path of ['/', '/shop', '/ourstory', '/contact', '/login', '/register']) check((await request(path)).status === 200, `Public page ${path}`);
  console.log(`PASS: ${checks} integration checks.`);
} catch (error) {
  console.error(error instanceof assert.AssertionError ? `FAIL: ${error.message}` : 'Integration check failed: verify connectivity, configuration, and the running app. No secrets have been logged.');
  process.exitCode = 1;
} finally {
  if (mongoose.connection.readyState === 1) await User.deleteMany({ email: { $in: [email, adminEmail] } });
  await mongoose.disconnect();
}
