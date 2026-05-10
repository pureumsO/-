import React from 'react';
import { Post } from '../types.ts';
import { useAppContext } from '../AppContext.tsx';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Tag, Plus, Image as ImageIcon, Send, X } from 'lucide-react';

export default function Blog() {
  const { posts, addPost } = useAppContext();
  const [isWriting, setIsWriting] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  const [author, setAuthor] = React.useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addPost({
      title,
      content,
      author: author || '작성자',
      date: new Date().toISOString().split('T')[0],
      tags: ['커뮤니티'],
      image: image || undefined
    });

    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
    setAuthor('');
    setIsWriting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold mb-6 text-brand-khaki">활동 소식</h1>
        <p className="text-brand-dark/60 leading-relaxed max-w-2xl mx-auto italic">
          "오늘 한 알의 씨앗을 심는 것은 내일의 희망을 심는 것과 같습니다."
          <br />우리들의 가드닝 이야기와 씨앗 도서관의 생생한 소식을 자유롭게 나누어주세요.
        </p>
      </div>

      {/* Write Button */}
      <div className="flex justify-center mb-16">
        <button
          onClick={() => setIsWriting(true)}
          className="flex items-center gap-2 px-8 py-3 bg-brand-khaki text-white rounded-full font-bold shadow-lg shadow-brand-khaki/20 hover:bg-brand-dark transition-all transform hover:scale-105"
        >
          <Plus className="h-5 w-5" /> 소식 들려주기
        </button>
      </div>

      {/* Writing Form Overlay */}
      <AnimatePresence>
        {isWriting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-brand-khaki">새 소식 작성하기</h2>
                <button onClick={() => setIsWriting(false)} className="p-2 hover:bg-brand-beige rounded-full transition-colors">
                  <X className="h-6 w-6 text-brand-dark/40" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-brand-dark/40 uppercase tracking-widest mb-2">제목</label>
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    className="w-full px-6 py-4 bg-brand-beige/20 border border-brand-khaki/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-khaki/20 text-lg font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-dark/40 uppercase tracking-widest mb-2">작성자 명</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="이름"
                      className="w-full px-6 py-4 bg-brand-beige/20 border border-brand-khaki/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-khaki/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-dark/40 uppercase tracking-widest mb-2">이미지 첨부</label>
                    <label className="flex items-center justify-center gap-2 px-6 py-4 bg-brand-beige/20 border-2 border-dashed border-brand-khaki/20 rounded-2xl cursor-pointer hover:bg-brand-khaki/5 transition-colors">
                      <ImageIcon className="h-5 w-5 text-brand-khaki" />
                      <span className="text-sm font-medium text-brand-khaki">{image ? '이미지 변경' : '사진 올리기'}</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>

                {image && (
                  <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-inner">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-brand-dark/40 uppercase tracking-widest mb-2">내용</label>
                  <textarea
                    required
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="우리의 씨앗 이야기를 들려주세요..."
                    className="w-full px-6 py-4 bg-brand-beige/20 border border-brand-khaki/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-khaki/20 leading-relaxed font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-brand-khaki text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-brand-khaki/20 hover:bg-brand-dark transition-all transform active:scale-[0.98]"
                >
                  <Send className="h-5 w-5" /> 게시하기
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
