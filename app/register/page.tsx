import type { Metadata } from 'next';
import { AuthShell } from '@/src/auth/AuthShell';
import { RegisterForm } from '@/src/auth/RegisterForm';

export const metadata: Metadata = { title: 'Register | Eagle Park Innovations' };

export default function RegisterPage() {
  return (
    <AuthShell title="Grow with a marketplace built for agriculture." text="Create an account to join a trusted network supporting farmers, agribusinesses, and sustainable food systems.">
      <RegisterForm />
    </AuthShell>
  );
}
