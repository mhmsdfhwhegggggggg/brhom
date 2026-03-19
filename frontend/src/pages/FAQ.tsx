import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, HelpCircle, MessageCircle, Zap, Shield, TrendingUp, Globe } from 'lucide-react';

const faqs = [
  { 
    q: 'ما هي INVESTCORP CAPITAL وكيف تضمن أرباحي؟', 
    a: 'INVESTCORP CAPITAL هي مؤسسة رائدة في حلول التكنولوجيا المالية (FinTech) المتخصصة في الأسواق الخليجية. نضمن أرباحك عبر خوارزميات تداول فائقة الذقة (Smart AI) تديرها فرقنا المحترفة، مع صندوق ضمان لتغطية أي تقلبات في السوق.' 
  },
  { 
    q: 'كم يبلغ العائد اليومي المتوقع وكيف يتم حسابه؟', 
    a: 'يتم حساب العائد بناءً على حجم المحفظة المختارة ونشاط السوق اليومي. متوسط العوائد يتراوح بين 1% إلى 5% يومياً، يتم إيداعها تلقائياً في حسابك.' 
  },
  { 
    q: 'هل يمكنني سحب رأس المال في أي وقت؟', 
    a: 'نعم، نحن نؤمن بالحرية المالية المطلقة. يمكنك طلب استرداد رأس مالك بالكامل في أي لحظة، وتتم معالجة الطلب خلال 24-48 ساعة عمل.' 
  },
  { 
    q: 'ما هي الضمانات القانونية والمؤسسية التي تقدمونها؟', 
    a: 'نعمل وفق معايير الحوكمة المالية الصارمة، ونوفر عقوداً استثمارية موثقة تضمن حقوق الطرفين، بالإضافة إلى نظام تأمين شامل على الأصول.' 
  },
  { 
    q: 'لماذا التركيز على الأسواق الخليجية تحديداً؟', 
    a: 'الأسواق الخليجية (السعودية، الإمارات، الكويت، قطر) تعد من أكثر الأسواق استقراراً ونمواً في العالم حالياً، مما يوفر بيئة استثمارية آمنة ومجزية بعيداً عن تقلبات الأسواق العالمية الكبرى.' 
  },
  { 
    q: 'كيف يمكنني البدء وما هو أقل مبلغ للاستثمار؟', 
    a: 'يمكنك البدء بفتح حساب وتفعيل "محفظة الكويت" بحد أدنى 500 دولار فقط. فريقنا متاح لمساعدتك في خطواتك الأولى.' 
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold mb-8 animate-fade-in uppercase tracking-wider">
           <HelpCircle className="w-4 h-4" />
           مركز المساعدة والشفافية
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 animate-slide-up">
           لديك <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">تساؤلات؟</span> نحن نملك الإجابات
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
           نحن نؤمن بأن الشفافية هي أساس الثقة. هنا ستجد إجابات واضحة ومباشرة لكل ما يدور في ذهنك حول رحلتك الاستثمارية معنا.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`glass rounded-[2.5rem] overflow-hidden transition-all duration-500 border-white/5 ${
                openIndex === i ? 'bg-white/[0.04] border-green-500/20' : 'hover:bg-white/[0.02]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-right group"
              >
                <span className={`font-black text-lg md:text-xl transition-colors ${openIndex === i ? 'text-green-400' : 'text-white'}`}>
                   {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  openIndex === i ? 'bg-green-500 text-white rotate-180' : 'bg-white/5 text-gray-500 group-hover:bg-white/10'
                }`}>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${
                openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-8 text-gray-400 text-lg leading-relaxed border-t border-white/5 pt-6">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Support */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-12 rounded-[3.5rem] border-white/5 bg-gradient-to-br from-green-500/[0.03] to-transparent">
               <MessageCircle className="w-12 h-12 text-green-400 mb-8" />
               <h3 className="text-2xl font-black text-white mb-4">دعم مباشر 24/7</h3>
               <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  فريق الخبراء لدينا متاح على مدار الساعة للإجابة على استفساراتك الفنية والمالية عبر تليغرام وبريدنا الإلكتروني.
               </p>
               <Link to="/contact" className="text-green-400 font-bold flex items-center gap-2 group">
                  تحدث معنا الآن
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </Link>
            </div>
            
            <div className="glass p-12 rounded-[3.5rem] border-white/5 bg-gradient-to-br from-blue-500/[0.03] to-transparent">
               <Zap className="w-12 h-12 text-blue-400 mb-8" />
               <h3 className="text-2xl font-black text-white mb-4">دليل الاستثمار السريع</h3>
               <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  هل تريد معرفة المزيد عن كيفية عمل خوارزمياتنا؟ قم بتحميل دليلنا الشامل للمستثمرين الجدد.
               </p>
               <button className="text-blue-400 font-bold flex items-center gap-2 group cursor-pointer">
                  تحميل الدليل (PDF)
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
         <div className="relative inline-block">
            <div className="absolute inset-x-0 bottom-1 h-3 bg-green-500/20 -rotate-1" />
            <h2 className="text-3xl font-black text-white relative">ما زلت غير متأكد؟</h2>
         </div>
         <p className="text-gray-400 text-xl mt-8 mb-12">اترك لنا رسالة وسنقوم بالاتصال بك خلال دقائق لشرح كل التفاصيل.</p>
         <Link to="/contact" className="premium-btn premium-btn-primary px-16 py-6 text-2xl inline-flex items-center gap-4">
            تواصل معنا
            <ArrowUpRight className="w-8 h-8" />
         </Link>
      </section>
    </div>
  );
}
