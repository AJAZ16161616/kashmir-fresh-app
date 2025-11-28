import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, Loader, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: { contact?: string; password?: string };
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialData }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', contact: '', password: '' });
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(prev => ({ 
          ...prev, 
          contact: initialData.contact || '', 
          password: initialData.password || '' 
        }));
        setIsLogin(true); // Ensure we are on the login tab if data is provided
      } else {
        // Reset if no initial data (clean open)
        setFormData({ name: '', contact: '', password: '' });
      }
      setError('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success;
      if (isLogin) {
        success = await login(formData.contact, formData.password);
      } else {
        success = await signup(formData.name, formData.contact, formData.password);
      }

      if (success) {
        onClose();
        setFormData({ name: '', contact: '', password: '' });
      } else {
        setError(isLogin ? 'Invalid credentials' : 'User already exists');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slideUp">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email or Mobile</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="user@example.com or 1234567890"
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold shadow-lg shadow-emerald-200 transition-all flex justify-center items-center gap-2"
          >
            {isLoading && <Loader className="animate-spin" size={18} />}
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
           <div className="text-center mb-4">
              <p className="text-sm text-slate-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
           </div>
           
           {isLogin && (
             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-3 text-left">
                <Info className="text-blue-500 flex-shrink-0" size={20} />
                <div className="text-xs text-blue-800">
                  <p className="font-bold mb-1">Demo Admin Credentials:</p>
                  <p className="mb-0.5"><span className="font-semibold text-blue-900">Email:</span> admin@freshmarket.com</p>
                  <p><span className="font-semibold text-blue-900">Password:</span> admin</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;