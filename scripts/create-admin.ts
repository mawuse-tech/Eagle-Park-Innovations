import nextEnv from '@next/env';
import mongoose from 'mongoose';
import { connectDatabase } from '../src/server/db';
import { User } from '../src/server/models/User';

nextEnv.loadEnvConfig(process.cwd());
try {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!name || !email || !password) throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be provided for this command');
  if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) throw new Error('A valid email and password of at least 8 characters are required');
  await connectDatabase();
  if (await User.exists({ email })) throw new Error('A user with that email already exists; no changes were made');
  await User.create({ name, email, password, role: 'admin' });
  console.log('Admin created successfully');
} catch (error) {
  const safeMessages = ['ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be provided for this command', 'A valid email and password of at least 8 characters are required', 'A user with that email already exists; no changes were made'];
  if (error && typeof error === 'object' && 'code' in error && error.code === 11000) console.error(safeMessages[2]);
  else console.error(error instanceof Error && safeMessages.includes(error.message) ? error.message : 'Admin creation failed. Check server configuration and database connectivity.');
  process.exitCode = 1;
} finally { await mongoose.disconnect(); }
