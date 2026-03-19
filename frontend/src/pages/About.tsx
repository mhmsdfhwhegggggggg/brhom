import { Link } from 'react-router-dom';
import { Shield, Target, Users, Award, Globe, TrendingUp, CheckCircle2, ArrowUpRight, Landmark, Building2, History, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold mb-8 animate-fade-in uppercase tracking-wider">
           <Landmark className="w-4 h-4" />
           إرث من الثقة والتميز
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 animate-slide-up">
           عن <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">إينفستكورب كابيتال</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
           تأسسنا لنكون المحرك الرئيسي للنمو المالي في المنطقة، مجمّعين بين الخبرة البشرية العميقة والذكاء الاصطناعي في إدارة الأصول.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, value: '+15.8k', label: 'مستثمر نشط' },
            { icon: Globe, value: '+12', label: 'سوق مدعوم' },
            { icon: History, value: '+8', label: 'سنوات من الريادة' },
            { icon: TrendingUp, value: '99.8%', label: 'نسبة الرضا' },
          ].map((s, i) => (
            <div key={i} className="glass p-8 rounded-[2.5rem] text-center group hover:bg-green-500/5 transition-all">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                 <s.icon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-black text-white mb-1 tabular-nums">{s.value}</div>
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-right">
             <h2 className="text-4xl font-black text-white leading-tight">رحلة بدأت بالشغف <br /><span className="text-green-500">وانتهت بالريادة</span></h2>
             <p className="text-gray-400 text-lg leading-relaxed">
                بدأت إينفستكورب كابيتال في عام 2017 برؤية واضحة: سد الفجوة بين المستثمر الطموح وفرص الأسواق الخليجية المعقدة. اليوم، نحن لا ندير محافظ فحسب، بل نبني مستقبلاً مالياً لآلاف العائلات.
             </p>
             <div className="space-y-4">
                {[
                  'تراخيص دولية ومحلية كاملة',
                  'حوكمة مؤسسية صارمة',
                  'إدارة مخاطر تعتمد على حلول الكم'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-bold">
                     <CheckCircle2 className="w-5 h-5 text-green-500" />
                     {item}
                  </div>
                ))}
             </div>
          </div>
          
          <div className="relative">
             <div className="glass rounded-[3rem] p-4 rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden shadow-2xl">
                <div className="bg-slate-800 rounded-[2.5rem] p-10 aspect-video flex items-center justify-center">
                   <Building2 className="w-24 h-24 text-white/10" />
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 glass p-8 rounded-[2rem] hidden md:block">
                <Briefcase className="w-8 h-8 text-amber-500 mb-4" />
                <span className="text-white font-black text-2xl">+$2.4B</span>
                <span className="text-gray-500 text-xs block">إجمالي التعاملات</span>
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">قيمنا الجوهرية</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Target, title: 'الدقة المطلقة', desc: 'كل قرار استثماري هو نتاج آلاف الساعات من التحليل والتدقيق لضمان أفضل مسار لنمو أموالك.' },
            { icon: Shield, title: 'الشفافية الكاملة', desc: 'نؤمن بأن الثقة تُبنى على الوضوح. يمكنك الوصول إلى أداء محفظتك وتفاصيل أرباحك في أي لحظة.' },
            { icon: Award, title: 'الابتكار المالي', desc: 'نطور باستمرار أدواتنا وخوارزمياتنا لنكون دائماً خطوة للأمام في اقتناص الفرص السوقية.' },
          ].map((v, i) => (
            <div key={i} className="glass-card glass rounded-[3rem] p-10 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <v.icon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-black text-2xl mb-6">{v.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
         <div className="glass rounded-[4rem] p-16 relative overflow-hidden text-center group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 blur-[150px]" />
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 blur-[150px]" />
            </div>
            <h2 className="text-4xl font-black text-white mb-8">حضورنا الخليجي</h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
               نمتلك شبكة واسعة من الشركاء والمحللين في دبي، الرياض، الكويت، والقاهرة، مما يمنحنا رؤية محلية بلمسة عالمية.
            </p>
            <div className="flex flex-wrap justify-center gap-12">
               {['الرياض', 'دبي', 'الكويت', 'أبوظبي', 'الدوحة', 'القاهرة'].map((city, i) => (
                 <span key={i} className="text-white/40 font-bold text-lg uppercase tracking-widest hover:text-green-400 transition-colors cursor-default">
                    {city}
                 </span>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
         <h2 className="text-4xl font-black text-white mb-8">خُطوتك القادمة تبدأ هنا</h2>
         <p className="text-gray-400 text-xl mb-12">تواصل مع مستشارينا الماليين وابدأ في تصميم محفظتك المثالية.</p>
         <div className="flex flex-wrap justify-center gap-6">
            <Link to="/plans" className="premium-btn premium-btn-primary px-12 py-5 text-xl flex items-center gap-3">
               اشترك الآن
               <ArrowUpRight className="w-6 h-6" />
            </Link>
            <Link to="/contact" className="premium-btn premium-btn-secondary px-10 py-5 text-xl">
               تحتاج مساعدة؟
            </Link>
         </div>
      </section>
    </div>
  );
}
