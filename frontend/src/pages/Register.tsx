import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Globe, Phone, CreditCard, Package, MessageSquare, 
  ChevronLeft, Sparkles, ShieldCheck, Zap, ArrowRight,
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { submitRegistration, getSetting } from '../lib/api';

const countries = [
  { id: 'sa', name: 'المملكة العربية السعودية', flag: '🇸🇦', currency: 'SAR' },
  { id: 'ae', name: 'الإمارات العربية المتحدة', flag: '🇦🇪', currency: 'AED' },
  { id: 'qa', name: 'دولة قطر', flag: '🇶🇦', currency: 'QAR' },
  { id: 'kw', name: 'دولة الكويت', flag: '🇰🇼', currency: 'KWD' },
];

const allPlans: Record<string, any[]> = {
  sa: [
    { name: 'باقة المبتدئين (KSA)', capital: 3000, daily: 1000 },
    { name: 'باقة النمو (KSA)', capital: 7000, daily: 2450 },
    { name: 'باقة النخبة (KSA)', capital: 15000, daily: 4750 },
  ],
  ae: [
    { name: 'باقة المبتدئين (UAE)', capital: 3000, daily: 1100 },
    { name: 'باقة النمو (UAE)', capital: 7500, daily: 2900 },
    { name: 'باقة النخبة (UAE)', capital: 15000, daily: 5750 },
  ],
  qa: [
    { name: 'باقة المبتدئين (QA)', capital: 3000, daily: 1680 },
    { name: 'باقة النمو (QA)', capital: 8500, daily: 3800 },
    { name: 'باقة النخبة (QA)', capital: 15000, daily: 7200 },
  ],
  kw: [
    { name: 'باقة المبتدئين (KW)', capital: 410, daily: 180 },
    { name: 'باقة النمو (KW)', capital: 850, daily: 320 },
    { name: 'باقة النخبة (KW)', capital: 1230, daily: 500 },
  ],
};

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('https://T.me/PU_M_P_O');

  const [formData, setFormData] = useState({
    name: '',
    country: searchParams.get('country') || 'sa',
    phone: '',
    account_wallet: '',
    plan_name: searchParams.get('plan') || '',
    notes: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSetting('telegram_url');
        if (res.data.value) setTelegramUrl(res.data.value);
      } catch (err) {
        console.error('Failed to fetch telegram URL', err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await submitRegistration(formData);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const currentCountryPlans = allPlans[formData.country as keyof typeof allPlans] || [];
  const selectedCountry = countries.find(c => c.id === formData.country);

  if (success) {
    return (
      <div className="min-h-screen bg-mesh pt-40 pb-20 px-6 flex items-center justify-center text-right" dir="rtl">
        <div className="max-w-xl w-full glass p-16 rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6">تهانينا! تم استلام طلبك</h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-12">
            تم تسجيل طلب اشتراكك في <span className="text-green-400 font-bold">{formData.plan_name}</span> بنجاح. سيقوم فريق الخبراء لدينا بمراجعة طلبك والتواصل معك عبر الهاتف أو تليجرام لتفعيل حسابك.
          </p>
          <div className="space-y-4">
            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-btn premium-btn-primary w-full py-5 text-xl flex items-center justify-center gap-3"
            >
              تواصل معنا عبر تليجرام الآن
              <Zap className="w-6 h-6" />
            </a>
            <button 
              onClick={() => navigate('/')}
              className="w-full py-4 text-gray-500 font-bold hover:text-white transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 px-6 selection:bg-green-500/30" dir="rtl">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side: Psychology & Trust */}
        <div className="flex-1 space-y-10 animate-slide-up">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              انضم لنخبة المستثمرين الخليجيين
           </div>
           
           <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              ابدأ رحلة <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">الثراء الحقيقي</span> <br />
              بضمانات رسمية معتمدة
           </h1>
           
           <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
              نحن في إينفستكورب كابيتال نؤمن بأن الأمان هو أساس كل استثمار ناجح. لهذا السبب، نقدم لك ضمانات كاملة على رأس المال واعتمادات قانونية من أكبر الهيئات المالية في دول الخليج.
           </p>

           <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: 'اعتمادات خليجية رسمية', desc: 'نعمل بتراخيص قانونية من الهيئات المالية في (السعودية، الإمارات، قطر، الكويت)' },
                { icon: Zap, title: 'ضمان كامل لرأس المال', desc: 'سياساتنا تضمن لك استرداد 100% من رأس مالك في حال تعثر الخطط' },
                { icon: Package, title: 'باقات مخصصة لكل دولة', desc: 'دراسات سوقية دقيقة لكل بورصة خليجية لضمان أعلى عوائد ممكنة' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 glass rounded-3xl border-white/5 hover:bg-white/[0.05] transition-all">
                   <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                      <item.icon className="w-7 h-7" />
                   </div>
                   <div>
                      <h3 className="text-white font-black text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full lg:max-w-md animate-fade-in delay-300">
           <div className="glass p-10 rounded-[3rem] relative overflow-hidden border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full" />
              
              <h2 className="text-2xl font-black text-white mb-8 text-center">طلب انضمام مستثمر جديد</h2>

              {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm animate-shake">
                   <AlertCircle className="w-5 h-5" />
                   {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Name */}
                 <div className="space-y-2">
                    <label className="text-gray-500 text-xs font-bold mr-2 uppercase">الاسم الكامل</label>
                    <div className="relative">
                       <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                       <input 
                         required
                         type="text" 
                         name="name"
                         value={formData.name}
                         onChange={handleChange}
                         placeholder="أدخل اسمك كما هو في البطاقة"
                         className="w-full glass bg-white/[0.02] border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:bg-white/[0.05] outline-none transition-all"
                       />
                    </div>
                 </div>

                 {/* Country Select */}
                 <div className="space-y-2">
                    <label className="text-gray-500 text-xs font-bold mr-2 uppercase">الدولة</label>
                    <div className="relative">
                       <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                       <select 
                         name="country"
                         value={formData.country}
                         onChange={handleChange}
                         className="w-full glass bg-white/[0.02] border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white appearance-none focus:border-green-500/50 focus:bg-white/[0.05] outline-none transition-all"
                       >
                          {countries.map(c => (
                            <option key={c.id} value={c.id} className="bg-slate-900">{c.flag} {c.name}</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 {/* Phone */}
                 <div className="space-y-2">
                    <label className="text-gray-500 text-xs font-bold mr-2 uppercase">رقم الهاتف (واتساب / تليجرام)</label>
                    <div className="relative">
                       <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                       <input 
                         required
                         type="tel" 
                         name="phone"
                         value={formData.phone}
                         onChange={handleChange}
                         placeholder="+966 50 000 0000"
                         className="w-full glass bg-white/[0.02] border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:bg-white/[0.05] outline-none transition-all"
                       />
                    </div>
                 </div>

                 {/* Account / Wallet */}
                 <div className="space-y-2">
                    <label className="text-gray-500 text-xs font-bold mr-2 uppercase">رقم الحساب أو المحفظة الرقمية</label>
                    <div className="relative">
                       <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                       <input 
                         required
                         type="text" 
                         name="account_wallet"
                         value={formData.account_wallet}
                         onChange={handleChange}
                         placeholder="IBAN أو عنوان المحفظة لنحول لك الأرباح"
                         className="w-full glass bg-white/[0.02] border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:bg-white/[0.05] outline-none transition-all"
                       />
                    </div>
                 </div>

                 {/* Plan Select */}
                 <div className="space-y-2">
                    <label className="text-gray-500 text-xs font-bold mr-2 uppercase">الباقة الاستثمارية</label>
                    <div className="relative">
                       <Package className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                       <select 
                         required
                         name="plan_name"
                         value={formData.plan_name}
                         onChange={handleChange}
                         className="w-full glass bg-white/[0.02] border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white appearance-none focus:border-green-500/50 focus:bg-white/[0.05] outline-none transition-all"
                       >
                          <option value="" className="bg-slate-900">-- اختر الباقة المناسبة --</option>
                          {currentCountryPlans.map(p => (
                            <option key={p.name} value={p.name} className="bg-slate-900">
                               {p.name} - (رأس مال: {p.capital} {selectedCountry?.currency})
                            </option>
                          ))}
                       </select>
                    </div>
                 </div>

                 {/* Notes */}
                 <div className="space-y-2">
                    <label className="text-gray-500 text-xs font-bold mr-2 uppercase">ملاحظات إضافية</label>
                    <div className="relative">
                       <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-gray-500" />
                       <textarea 
                         name="notes"
                         value={formData.notes}
                         onChange={handleChange}
                         placeholder="أي تفاصيل أخرى تود إضافتها..."
                         rows={3}
                         className="w-full glass bg-white/[0.02] border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:bg-white/[0.05] outline-none transition-all resize-none"
                       />
                    </div>
                 </div>

                 <button 
                   disabled={loading}
                   type="submit" 
                   className="premium-btn premium-btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {loading ? (
                       <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          جاري معالجة طلبك...
                       </>
                    ) : (
                       <>
                          تأكيد طلب الاشتراك
                          <ArrowRight className="w-6 h-6" />
                       </>
                    )}
                 </button>

                 <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-green-500" />
                    بياناتك محمية بموجب بروتوكول التشفير العالي
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
