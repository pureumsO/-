import React from 'react';
import { motion } from 'motion/react';
import { Sprout, BookOpen, Heart, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24">
      {/* Introduction */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-brand-khaki font-bold uppercase tracking-widest text-sm mb-6">
                <div className="h-px w-8 bg-brand-khaki" /> MISSION & VISION
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                작은 씨앗 속에 담긴 <br />
                <span className="text-brand-khaki italic text-6xl">내일의 가능성</span>
              </h1>
              <div className="space-y-6 text-brand-dark/70 text-lg leading-relaxed">
                <p>
                  함평초등학교 씨앗도서관은 학생들이 직접 운영하는 교육적이고 생태적인 공간입니다. 
                  우리는 단순히 씨앗을 빌려주는 것을 넘어, 생명의 소중함과 책임감을 배우는 공동체를 지향합니다.
                </p>
                <p>
                  씨앗을 빌려가서 꽃을 피우고 열매를 맺는 과정은 정직한 노동과 기다림의 미학을 가르쳐줍니다. 
                  수확의 기쁨을 누린 후, 다시 씨앗을 받아 도서관에 되돌려주는 과정은 대가 없는 나눔과 순환의 가치를 실천하는 일입니다.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=800" 
                  alt="Students Gardening" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-khaki/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-brand-beige rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-beige/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sprout, title: "생태 감수성", desc: "자연과 내가 연결되어 있음을 체감합니다." },
              { icon: BookOpen, title: "실천적 학습", desc: "책이 아닌 흙과 식물을 통해 직접 부딪히며 배웁니다." },
              { icon: Heart, title: "공동체 의식", desc: "이웃과 씨앗을 나누며 함께 성장하는 즐거움을 누립니다." },
              { icon: Globe, title: "지속가능성", desc: "미래 세대를 위한 토종 씨앗을 보존하고 생태계를 지킵니다." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2rem] border border-brand-khaki/5 shadow-sm text-center">
                <div className="inline-flex p-4 rounded-2xl bg-brand-beige text-brand-khaki mb-6">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">도서관 이용 방법</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "씨앗 선택", desc: "온라인 목록이나 도서관 방문을 통해 원하는 씨앗을 고릅니다." },
              { step: "02", title: "대출 신청", desc: "간단한 신청서를 작성하고 씨앗을 빌려갑니다. (1인 최대 2종)" },
              { step: "03", title: "정성껏 재배", desc: "씨앗을 심고 애정을 듬뿍 주며 식물로 키워냅니다." },
              { step: "04", title: "씨앗 채종 및 반납", desc: "수확한 열매에서 다시 씨앗을 받아 도서관에 돌려주세요." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 group">
                <span className="text-6xl font-serif font-black text-brand-khaki/10 group-hover:text-brand-khaki/20 transition-colors shrink-0">
                  {item.step}
                </span>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-brand-dark/60 leading-relaxed italic">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
