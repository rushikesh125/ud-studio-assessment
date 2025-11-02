
'use client';
import { LoginButtons } from '@/components/LoginButtons';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Image Search App</h1>
        <LoginButtons />
      </div>
    </div>
  );
}