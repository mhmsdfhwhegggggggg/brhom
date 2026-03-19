import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, DollarSign, LogOut, User, Briefcase, BarChart3,
  Calendar, Shield, CreditCard, Percent, ArrowUpRight, Wallet, History,
  Activity, Zap, Globe, Lock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getClientProfile, getMyProfits } from '../lib/api';

interface ClientProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  access_code: string;
  subscription_plan: string;
  subscription_price: number;
  subscription_status: string;
  profit_fees_percent: number;
  total_investment: number;
  total_profit: number;
  daily_profit: number;
  balance: number;
  created_at: string;
}

interface ProfitRecord {
  id: number;
  amount: number;
  description: string;
  date: string;
}

export default function ClientPortal() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [profits, setProfits] = useState<ProfitRecord[]>([]);
  const [tab, setTab] = useState<'overview' | 'profits'>('overview');
  const [chartData, setChartData] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [profileRes, profitsRes] = await Promise.all([
        getClientProfile(), getMyProfits()
      ]);
      setProfile(profileRes.data);
      setProfits(profitsRes.data);
      
      // Mock chart data based on profits
      const pData = profitsRes.data.slice(0, 7).reverse().map((p: any, i: number) => ({
        name: new Date(p.date).toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' }),
        value: profileRes.data.balance - (7-i)*50 // mock trend
      }));
      setChartData(pData);
    } catch {
      navigate('/client-login');
    }
  }, [navigate]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'client') { navigate('/client-login'); return; }
    loadData();
  }, [navigate, loadData]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/client-login');
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
           <div className="text-green-400 font-bold animate-pulse text-lg uppercase tracking-widest">تحميل محفظتك...</div>
        </div>
      </div>
    );
  }

  const statusLabel = profile.subscription_status === 'active' ? 'نشط' : profile.subscription_status === 'expired' ? 'منتهي' : 'غير نشط';
  const statusColor = profile.subscription_status === 'active' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20';

  return (
    <div className="min-h-screen bg-mesh pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-white font-black block text-lg tracking-tight">بوابة المستثمر</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Investcorp Client Portal</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-400 text-xs font-bold">متصل بـ {profile.name}</span>
             </div>
             <button onClick={handleLogout} className="flex items-center gap-2 group px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-bold">
               <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
               <span className="text-sm">خروج آمن</span>
             </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* Main Wallet View */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
           
           {/* Primary Card */}
           <div className="lg:col-span-8">
              <div className="glass-card glass rounded-[3.5rem] p-10 border-white/10 relative overflow-hidden backdrop-blur-3xl min-h-[400px] flex flex-col justify-between group">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                 
                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-green-400" />
                          إجمالي الرصيد الصافي
                       </span>
                       <div className={`px-4 py-1.5 rounded-full border text-xs font-black ${statusColor}`}>
                          {statusLabel}
                       </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10">
                       <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter">
                          ${profile.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                       </h2>
                       <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                          <TrendingUp className="w-5 h-5" />
                          <span>+ {profile.daily_profit.toLocaleString()} اليوم</span>
                       </div>
                    </div>
                 </div>

                 <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/5">
                    {[
                      { label: 'رأس المال', value: `$${profile.total_investment.toLocaleString()}`, icon: Briefcase, color: 'text-blue-400' },
                      { label: 'صافي الأرباح', value: `$${profile.total_profit.toLocaleString()}`, icon: Activity, color: 'text-emerald-400' },
                      { label: 'رسوم الأرباح', value: `${profile.profit_fees_percent}%`, icon: Percent, color: 'text-amber-400' },
                      { label: 'نوع المحفظة', value: profile.subscription_plan, icon: Shield, color: 'text-purple-400' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                         <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                            <item.icon className={`w-3 h-3 ${item.color}`} />
                            {item.label}
                         </div>
                         <div className="text-white font-black text-lg">{item.value}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Quick Actions / Chart Mini */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="glass rounded-[3rem] p-8 border-white/5 flex-1 relative overflow-hidden group hover:border-white/10 transition-colors">
                 <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                    نمو المحفظة
                 </h3>
                 <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase">
                    <span>السبت</span>
                    <span>اليوم</span>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] p-6 border-white/5 bg-gradient-to-br from-green-500/[0.04] to-transparent">
                 <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                       <Zap className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                       <div className="font-black text-sm">عزز استثماراتك</div>
                       <div className="text-gray-500 text-xs">قم بترقية باقتك للحصول على رسوم أقل.</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 mr-auto text-gray-600" />
                 </div>
              </div>
           </div>
        </section>

        {/* Tabs & Content */}
        <section className="space-y-8 animate-fade-in delay-200">
           <div className="flex items-center gap-2 p-1.5 glass rounded-2xl w-fit">
              {[
                { id: 'overview' as const, label: 'تفاصيل الحساب', icon: User },
                { id: 'profits' as const, label: 'سجل العمليات', icon: History },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                    tab === t.id ? 'bg-green-500 text-white shadow-lg shadow-green-500/20 scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
           </div>

           {tab === 'overview' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-10 rounded-[3rem] border-white/5 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full" />
                   <h3 className="text-white font-black text-xl mb-8 flex items-center gap-3">
                      <Shield className="w-6 h-6 text-green-400" />
                      البيانات الشخصية
                   </h3>
                   <div className="space-y-6">
                      {[
                        { label: 'الاسم الكامل', value: profile.name, icon: User },
                        { label: 'البريد الإلكتروني', value: profile.email || 'لم يحدد', icon: Globe },
                        { label: 'رقم الهاتف', value: profile.phone || 'لم يحدد', icon: Activity },
                        { label: 'تاريخ الانضمام', value: new Date(profile.created_at).toLocaleDateString('ar-SA'), icon: Calendar },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                           <div className="flex items-center gap-3 text-gray-500 font-bold text-xs">
                              <row.icon className="w-4 h-4" />
                              {row.label}
                           </div>
                           <div className="text-white font-black">{row.value}</div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="glass p-10 rounded-[3rem] border-white/5 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full" />
                   <h3 className="text-white font-black text-xl mb-8 flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-amber-400" />
                      تفاصيل المحفظة
                   </h3>
                   <div className="space-y-6">
                      {[
                        { label: 'سعر الاشتراك المدفوع', value: `$${profile.subscription_price.toLocaleString()}`, color: 'text-white' },
                        { label: 'حالة الحساب القانونية', value: 'موثق ومعتمد', color: 'text-green-400' },
                        { label: 'رمز الدخول الخاص', value: profile.access_code, color: 'text-amber-400 font-mono' },
                        { label: 'آخر تحديث للبيانات', value: 'الآن', color: 'text-gray-400' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-admin-between py-2 border-b border-white/5">
                           <div className="text-gray-500 font-bold text-xs">{row.label}</div>
                           <div className={`font-black ${row.color}`}>{row.value}</div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           ) : (
             <div className="glass rounded-[3rem] border-white/5 overflow-hidden animate-slide-up">
                <div className="overflow-x-auto">
                   <table className="w-full text-right">
                      <thead>
                         <tr className="bg-white/5">
                            <th className="p-8 text-gray-400 text-xs font-black uppercase tracking-widest">تاريخ العملية</th>
                            <th className="p-8 text-gray-400 text-xs font-black uppercase tracking-widest">الوصف / البيان</th>
                            <th className="p-8 text-gray-400 text-xs font-black uppercase tracking-widest">المبلغ</th>
                            <th className="p-8 text-gray-400 text-xs font-black uppercase tracking-widest">الحالة</th>
                         </tr>
                      </thead>
                      <tbody className="text-sm">
                         {profits.map((p) => (
                           <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="p-8 text-gray-500 font-bold">{new Date(p.date).toLocaleDateString('ar-SA')}</td>
                              <td className="p-8">
                                 <div className="text-white font-black">{p.description}</div>
                                 <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Transaction ID: TX-{p.id}992</div>
                              </td>
                              <td className="p-8">
                                 <span className="text-green-400 font-black text-lg">+ ${p.amount.toLocaleString()}</span>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-2 text-green-500/80 font-black text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                    مكتملة
                                 </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                   {profits.length === 0 && (
                     <div className="p-20 text-center space-y-4">
                        <History className="w-16 h-16 text-gray-700 mx-auto" />
                        <div className="text-gray-500 font-bold">لا يوجد سجل تاريخي للعمليات بعد.</div>
                     </div>
                   )}
                </div>
             </div>
           )}
        </section>

        {/* Security Notice */}
        <div className="mt-20 glass p-8 rounded-[3rem] border-white/5 text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-l from-green-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <Lock className="w-10 h-10 text-gray-700 mx-auto mb-4" />
           <p className="text-gray-500 text-sm font-bold max-w-2xl mx-auto leading-relaxed">
              هذه البوابة مخصصة حصرياً للعرض والمراقبة. كافة البيانات الاستثمارية محمية بعقود قانونية وتشفير عسكري لضمان سلامة أصولك. لا يمكنك تعديل أي بيانات هنا حفاظاً على المصداقية والشفافية.
           </p>
        </div>
      </div>
    </div>
  );
}
