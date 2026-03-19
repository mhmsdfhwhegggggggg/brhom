import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, RefreshCw, ArrowRight } from 'lucide-react';
import { adminLogin } from '../lib/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminLogin(username, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('username', res.data.username);
      navigate('/admin');
    } catch {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4 selection:bg-amber-500/30" dir="rtl">
      <div className="w-full max-w-lg animate-fade-in">
        
        <div className="text-center mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Shield className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter mb-2">ADMIN ACCESS</h1>
           <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">INVESTCORP CENTRAL COMMAND</p>
        </div>

        <div className="glass rounded-[3rem] p-10 border-white/10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-amber-500/20 transition-all duration-700" />
           
           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                 <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">Identity</label>
                 <div className="relative group/input">
                    <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-amber-500 transition-colors" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-white focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:text-gray-700"
                      placeholder="Username"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">Secret Code</label>
                 <div className="relative group/input">
                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-amber-500 transition-colors" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-white focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:text-gray-700"
                      placeholder="••••••••"
                    />
                 </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-sm font-bold animate-shake">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                   {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98]"
              >
                {loading ? (
                   <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                   <>
                     <Shield className="w-6 h-6" />
                     <span>INITIALIZE SESSION</span>
                   </>
                )}
              </button>
           </form>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors mx-auto font-bold text-sm group"
        >
           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           العودة للموقع الرئيسي
        </button>
      </div>
    </div>
  );
}
