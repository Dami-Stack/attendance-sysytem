import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircle, Lock, LogIn } from 'lucide-react';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login
  } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };
  const demoCredentials = [{
    role: 'Student',
    email: 'damilola@student.edu',
    password: 'student123'
  }, {
    role: 'Admin',
    email: 'admin@cs.edu',
    password: 'admin123'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">CS Department</h1>
            <p className="text-gray-600 mt-2">Attendance Management System</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter your email" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter your password" required />
              </div>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>}
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Demo Credentials:
            </p>
            <div className="space-y-2">
              {demoCredentials.map((cred, index) => <div key={index} className="bg-gray-50 p-3 rounded-lg text-xs">
                  <div className="font-semibold text-gray-900 mb-1">
                    {cred.role}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-mono">{cred.email}</span>
                    <span className="mx-2">•</span>
                    <span className="font-mono">{cred.password}</span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
}