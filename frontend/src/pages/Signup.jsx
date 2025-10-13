import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { setAuthToken } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Signup(){
  const [email, setEmail] = useState(''), [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { save } = useAuth();

  async function handle(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { email, password });
      save(res.data);
      setAuthToken(res.data.token);
      navigate('/');
    } catch(err){
      alert(err.response?.data?.message || 'Signup failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handle} className="space-y-4">
          <input className="w-full px-3 py-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="w-full px-3 py-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="w-full py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading ? '...' : 'Create account'}</button>
        </form>
        <p className="mt-4 text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
}
