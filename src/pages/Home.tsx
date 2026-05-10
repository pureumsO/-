import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Sprout, Users } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';
import { Link } from 'react-router-dom';

export default function Home() {
  const { seeds, posts } = useAppContext();
  
  const featuredSeeds = seeds.slice(0, 3);
  const latestPosts = posts.slice(0, 2);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000" 
            alt="Nature Background" 
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-khaki/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              자연의 약속,<br />
              <span className="text-brand-beige">씨앗을 빌려드립니다.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 font-light leading-relaxed">
              함평초등학교 4학년 1반 학생들이 운영하는 특별한 도서관입니다. 
              책 대신 씨앗을 빌려가고, 정성으로 키워 다시 씨앗으로 되돌려주는 
              생명의 순환을 함께 경험해보세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog" className="px-8 py-4 bg-brand-khaki text-white rounded-full font-medium hover:bg-brand-dark transition-all flex items-center gap-2">
                씨앗 둘러보기 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">도서관의 철학</h2>
          <div className="h-1 w-20 bg-brand-khaki mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-sans">
          {[
            { icon: Sprout, title: "생명의 가치", desc: "작은 씨앗 하나가 가진 거대한 생명의 힘을 배웁니다." },
            { icon: Leaf, title: "책임감 있는 대출", desc: "빌려간 씨앗을 정성껏 키워 다시 되돌려주는 책임을 공유합니다." },
            { icon: Users, title: "함께하는 공동체", desc: "학생, 선생님, 지역 주민이 식물을 통해 소통합니다." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-3xl bg-white border border-brand-khaki/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex p-4 rounded-2xl bg-brand-beige text-brand-khaki mb-6">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-brand-dark/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Seeds */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">이달의 추천 씨앗</h2>
              <p className="text-brand-dark/60">지금 심으면 딱 좋은 씨앗들을 추천합니다.</p>
            </div>
            <Link to="/catalog" className="text-brand-khaki font-medium flex items-center gap-1 hover:underline">
              모두 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSeeds.map((seed) => (
              <motion.div 
                key={seed.id}
                whileHover={{ y: -10 }}
                className="group relative bg-brand-beige/30 rounded-[2rem] overflow-hidden border border-brand-khaki/5"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={seed.image} 
                    alt={seed.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-brand-khaki/10 text-brand-khaki text-xs font-semibold rounded-full mb-3">
                    {seed.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{seed.name}</h3>
                  <p className="text-brand-dark/60 text-sm line-clamp-2 mb-4">
                    {seed.description}
                  </p>
                  <Link to="/catalog" className="text-brand-khaki text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    대출 신청하기 <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Activity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">활동 소식</h2>
          <div className="h-1 w-20 bg-brand-khaki mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {latestPosts.map((post) => (
            <Link key={post.id} to="/blog" className="flex flex-col md:flex-row gap-6 group">
              <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shrink-0">
                <img 
                  src={post.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-brand-khaki text-sm font-semibold mb-2">{post.date}</p>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-khaki transition-colors">{post.title}</h3>
                <p className="text-brand-dark/60 line-clamp-2 mb-4 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-brand-dark/40 font-mono">#{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
