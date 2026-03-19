import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, ArrowUpRight, Zap, Shield, 
  TrendingUp, Award, Gem, ShieldCheck, 
  BadgeCheck, Users, Briefcase
} from 'lucide-react';

const countries = [
  { id: 'sa', name: 'المملكة العربية السعودية', flag: '🇸🇦', currency: 'SAR' },
  { id: 'ae', name: 'الإمارات العربية المتحدة', flag: '🇦🇪', currency: 'AED' },
  { id: 'qa', name: 'دولة قطر', flag: '🇶🇦', currency: 'QAR' },
  { id: 'kw', name: 'دولة الكويت', flag: '🇰🇼', currency: 'KWD' },
];

const allPlans: Record<string, any[]> = {
  sa: [
    { 
      name: 'باقة المبتدئين (KSA)', 
      capital: 3000, 
      daily: 1000, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي مضمون 1,000 ريال', 'حماية رأس المال بنسبة 100%', 'دعم فني عبر تليجرام', 'تقارير أداء أسبوعية']
    },
    { 
      name: 'باقة النمو (KSA)', 
      capital: 7000, 
      daily: 2450, 
      period: '60 يوم', 
      popular: true,
      features: ['عائد يومي مضمون 2,450 ريال', 'تأمين شامل على المحفظة', 'مدير حساب مخصص', 'أولوية في سحب الأرباح', 'تقارير أداء يومية']
    },
    { 
      name: 'باقة النخبة (KSA)', 
      capital: 15000, 
      daily: 4750, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي مضمون 4,750 ريال', 'اعتمادات مالية رسمية', 'دخول حصري لصفقات VIP', 'سحب فوري للأرباح', 'استشارات مالية مجانية']
    },
  ],
  ae: [
    { 
      name: 'باقة المبتدئين (UAE)', 
      capital: 3000, 
      daily: 1100, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي مضمون 1,100 درهم', 'تأمين حكومي على الاستثمار', 'دعم فني متميز', 'تقارير سوقية تفصيلية']
    },
    { 
      name: 'باقة النمو (UAE)', 
      capital: 7500, 
      daily: 2900, 
      period: '60 يوم', 
      popular: true,
      features: ['عائد يومي مضمون 2,900 درهم', 'حماية الأصول بنسبة 100%', 'استشارات استراتيجية', 'أولوية السحب اللحظي']
    },
    { 
      name: 'باقة النخبة (UAE)', 
      capital: 15000, 
      daily: 5750, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي مضمون 5,750 درهم', 'امتيازات كبار المستثمرين', 'مدير محفظة دولي', 'عضوية نادي المستثمرين']
    },
  ],
  qa: [
    { 
      name: 'باقة المبتدئين (QA)', 
      capital: 3000, 
      daily: 1680, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي 1,680 ريال قطري', 'ضمانات بنكية معتمدة', 'خدمات دعم فني متكاملة']
    },
    { 
      name: 'باقة النمو (QA)', 
      capital: 8500, 
      daily: 3800, 
      period: '60 يوم', 
      popular: true,
      features: ['عائد يومي 3,800 ريال قطري', 'تراخيص مالية دولية', 'مدير حسابات VIP']
    },
    { 
      name: 'باقة النخبة (QA)', 
      capital: 15000, 
      daily: 7200, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي 7,200 ريال قطري', 'أعلى مستويات الأرباح', 'تأمين استثماري شامل']
    },
  ],
  kw: [
    { 
      name: 'باقة المبتدئين (KW)', 
      capital: 410, 
      daily: 180, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي 180 دينار كويتي', 'حماية رأس المال بالكامل', 'تقارير أداء دورية']
    },
    { 
      name: 'باقة النمو (KW)', 
      capital: 850, 
      daily: 320, 
      period: '60 يوم', 
      popular: true,
      features: ['عائد يومي 320 دينار كويتي', 'استراتيجيات استثمارية متقدمة', 'دعم فني مخصص']
    },
    { 
      name: 'باقة النخبة (KW)', 
      capital: 1230, 
      daily: 500, 
      period: '60 يوم', 
      popular: false,
      features: ['عائد يومي 500 دينار كويتي', 'امتيازات استثمارية حصرية', 'مدير محفظة خبير']
    },
  ],
};

export default function Plans() {
  const [selectedCountry, setSelectedCountry] = useState('sa');
  const countryData = countries.find(c => c.id === selectedCountry);
  const plans = allPlans[selectedCountry] || [];

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Hero with Psychological Triggers */}
      <section className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold mb-8 animate-fade-in uppercase tracking-wider">
           <ShieldCheck className="w-4 h-4" />
           اعتمادات خليجية رسمية ومعتمدة 100%
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 animate-slide-up">
           باقات <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">الاستثمار الذكي</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
           نحن في إينفستكورب كابيتال لا نقدم وعوداً فحسب، بل نقدم نتائج. باقات استثمارية مصممة بعلم النفس المالي لضمان نمو ثروتك بأمان تام.
        </p>
      </section>

      {/* Country Selection Tabs */}
      <section className="max-w-4xl mx-auto px-6 mb-20 animate-fade-in delay-200">
         <div className="glass p-2 rounded-[2rem] flex flex-wrap md:flex-nowrap gap-2">
            {countries.map(country => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all ${
                  selectedCountry === country.id 
                    ? 'bg-gradient-to-l from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/20' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="hidden sm:inline">{country.name}</span>
                <span className="sm:hidden">{country.id.toUpperCase()}</span>
              </button>
            ))}
         </div>
      </section>

      {/* Plans Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <div
              key={`${selectedCountry}-${i}`}
              className={`glass-card glass rounded-[3.5rem] p-10 relative flex flex-col group hover:scale-[1.03] transition-all duration-500 border-white/5 ${
                plan.popular ? 'border-green-500/30 shadow-[0_0_60px_-15px_rgba(34,197,94,0.3)]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[11px] font-black rounded-full flex items-center gap-2 shadow-2xl uppercase tracking-tighter z-20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  الأكثر طلباً من المستثمرين
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              )}
              
              <div className="text-right mb-10 relative z-10 transition-transform duration-500">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg text-emerald-400 text-[10px] font-bold uppercase mb-4">
                   <TrendingUp className="w-3.5 h-3.5" />
                   نمو يومي مستهدف
                </div>
                <h3 className="text-white font-black text-3xl group-hover:text-green-400 transition-colors">{plan.name}</h3>
                <div className="text-gray-500 text-sm font-bold mt-1">مدة الاستثمار: {plan.period}</div>
              </div>

              <div className="mb-10 p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/5 relative z-10 text-center">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">ربح يومي ثابت بموجب العقد</div>
                <div className="text-green-400 font-black text-5xl mb-6 tabular-nums">
                   {plan.daily} <span className="text-lg opacity-60 font-medium">{countryData?.currency}</span>
                </div>
                <div className="flex items-center justify-between text-white/40 text-sm font-bold pt-6 border-t border-white/5">
                   <span>رأس المال</span>
                   <span className="text-white text-lg">{plan.capital} {countryData?.currency}</span>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-grow relative z-10 px-2">
                {plan.features.map((f: string, j: number) => (
                  <li key={j} className="flex items-start gap-4 text-sm text-gray-400 font-medium">
                    <BadgeCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={`/register?plan=${encodeURIComponent(plan.name)}&country=${selectedCountry}`}
                className={`relative z-10 block text-center py-6 rounded-[2.5rem] font-black text-lg transition-all ${
                  plan.popular
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/20'
                    : 'glass border-green-500/20 text-green-400 hover:bg-green-500/10 shadow-lg'
                }`}
              >
                تفعيل الباقة الآن
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Invest - Psychological Reinforcement */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
         <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">لماذا يختارنا <span className="text-green-500">كبار المستثمرين؟</span></h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">نحن نبني جسوراً من الثقة عبر إجراءات قانونية وضمانات مالية غير مسبوقة.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: 'حماية قانونية', 
                desc: 'عقود استثمارية رسمية موثقة تضمن حقوقك بالكامل وتحدد المسؤوليات بكل شفافية.',
                color: 'text-blue-400'
              },
              { 
                icon: Users, 
                title: 'مجتمع النخبة', 
                desc: 'انضم إلى أكثر من 15,800 مستثمر ناجح في منطقة الخليج يشاركونك نفس الطموح والنجاح.',
                color: 'text-green-400'
              },
              { 
                icon: Briefcase, 
                title: 'خبرة عريقة', 
                desc: 'فريق عمل بخبرة تتجاوز 15 عاماً في إدارة الأصول والأسواق المالية العالمية والمحلية.',
                color: 'text-amber-400'
              },
              { 
                icon: Award, 
                title: 'اعتمادات دولية', 
                desc: 'حائزون على جوائز التميز في الاستثمار الرقمي والأمان المالي من عدة جهات إقليمية ودولية.',
                color: 'text-purple-400'
              }
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] text-right border-white/5 hover:bg-white/[0.04] transition-all">
                 <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 ${item.color}`}>
                    <item.icon className="w-8 h-8" />
                 </div>
                 <h3 className="text-white font-black text-xl mb-4 group-hover:text-green-400 transition-colors">{item.title}</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Social Proof & Trust Card */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
         <div className="glass rounded-[4rem] p-16 text-center border-amber-500/10 bg-gradient-to-br from-amber-500/[0.03] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <Gem className="w-16 h-16 text-amber-500 mx-auto mb-10 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase">استثمارك.. أمانة في أعناقنا</h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
               "لقد غيرت إينفستكورب كابيتال مفهوم الاستثمار بالنسبة لي. لم أكن أتخيل يوماً أن أحقق هذه العوائد من منزلي وبكل هذه السهولة والأمان."
               <br />
               <span className="text-amber-500 font-black block mt-6 text-sm italic">— أحد كبار مستثمرينا في السعودية</span>
            </p>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-10 opacity-30" />
            <div className="text-amber-500 font-black text-xs uppercase tracking-[0.4em] leading-relaxed">
               تراخيص مالية معتمدة | ضمان رأس المال | سحب فوري
            </div>
         </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-4xl mx-auto px-6 text-center">
         <h2 className="text-4xl font-black text-white mb-8 leading-tight">جاهز للانضمام إلى <br /> <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">عالم الثراء الذكي؟</span></h2>
         <p className="text-gray-400 text-xl mb-12">فريق العمل جاهز لمساعدتك في كل خطوة. تواصل معنا الآن عبر تليجرام.</p>
         <div className="flex flex-wrap justify-center gap-6">
            <Link to="/register" className="premium-btn premium-btn-primary px-16 py-6 text-2xl flex items-center gap-4">
               اشترك الآن
               <ArrowUpRight className="w-8 h-8" />
            </Link>
            <Link to="/contact" className="premium-btn premium-btn-secondary px-10 py-6 text-2xl">
               تواصل مع خبير
            </Link>
         </div>
         <p className="mt-12 text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
            <ShieldCheck className="w-4 h-4" />
            جميع الاستثمارات تخضع لشروط اتفاقية حماية المستثمر
         </p>
      </section>
    </div>
  );
}
