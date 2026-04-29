import React from 'react';
import { Post } from '../types.ts';
import { useAppContext } from '../AppContext.tsx';
import { motion } from 'motion/react';
import { Calendar, User, Tag } from 'lucide-react';

export default function Blog() {
  const { posts } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-serif font-bold mb-6 text-brand-khaki">활동 소식</h1>
        <p className="text-brand-dark/60 leading-relaxed max-w-2xl mx-auto italic">
          "오늘 한 알의 씨앗을 심는 것은 내일의 희망을 심는 것과 같습니다."
          <br />학생들의 가드닝 일기와 씨앗도서관의 생생한 이야기를 전합니다.
        </p>
      </div>

      <div className="space-y-24">
        {posts.map((post, index) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            {post.image && (
              <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-10 shadow-lg group-hover:shadow-xl transition-all">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
            
            <div className="px-4">
              <div className="flex flex-wrap items-center gap-6 text-sm text-brand-dark/40 font-medium mb-4 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" /> {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" /> {post.tags.join(', ')}
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 group-hover:text-brand-khaki transition-colors leading-tight">
                {post.title}
              </h2>
              
              <div className="text-brand-dark/70 leading-relaxed text-lg mb-8 font-light whitespace-pre-wrap">
                {post.content}
              </div>
              
              <div className="h-px w-full bg-brand-khaki/10" />
            </div>
          </motion.article>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-brand-khaki/10">
          <p className="text-brand-dark/40">아직 등록된 활동 소식이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
