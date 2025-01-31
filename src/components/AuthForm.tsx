import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function AuthForm({ onComplete }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Simulate login
      if (formData.email && formData.password) {
        // In a real app, this would be an API call
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        setError('Please fill in all fields');
      }
    } else {
      // Sign up flow
      if (!verificationSent) {
        if (formData.name && formData.email && formData.password) {
          setVerificationSent(true);
        } else {
          setError('Please fill in all fields');
        }
      } else {
        // Verify code
        if (verificationCode.length === 6) {
          onComplete();
        } else {
          setError('Please enter a valid verification code');
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {isLogin ? 'Welcome back' : 'Get started'}
        </h2>
        <p className="mt-2 text-gray-600">
          {isLogin
            ? 'Sign in to your account'
            : 'Create your account to setup your chatbot'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!isLogin && !verificationSent && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
          </div>
        )}

        {!verificationSent && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
              {!isLogin && (
                <p className="mt-1 text-sm text-gray-500">
                  Must be at least 8 characters
                </p>
              )}
            </div>
          </>
        )}

        {verificationSent && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setVerificationCode(value);
                  }
                }}
                className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-center text-2xl tracking-widest shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="000000"
                maxLength={6}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Enter the 6-digit code sent to your email
            </p>
          </div>
        )}

        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLogin ? 'Sign in' : (verificationSent ? 'Verify Email' : 'Sign up')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setVerificationSent(false);
              setError('');
              setFormData({ email: '', password: '', name: '' });
              setVerificationCode('');
            }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </form>
    </div>
  );
}