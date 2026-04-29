import React from 'react';
import { useAppContext } from '../AppContext.tsx';
import { Seed, Post, SiteSettings } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  FileText, 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Edit,
  Save,
  X,
  History,
  Droplets,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils.ts';

export default function Admin() {
  const { 
    seeds, posts, settings, lendingRecords,
    addSeed, updateSeed, deleteSeed,
    addPost, updatePost, deletePost,
    updateSettings, returnSeed
  } = useAppContext();

  const [activeTab, setActiveTab] = React.useState<'overview' | 'inventory' | 'blog' | 'settings'>('overview');
  const [editingSeed, setEditingSeed] = React.useState<Seed | null>(null);
  const [isAddingSeed, setIsAddingSeed] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<Post | null>(null);
  const [isAddingPost, setIsAddingPost] = React.useState(false);
  
  const [localSettings, setLocalSettings] = React.useState<SiteSettings>(settings);

  const stats = [
    { label: '전체 씨앗 종', value: seeds.length, icon: Droplets },
    { label: '활동 게시글', value: posts.length, icon: FileText },
    { label: '현재 대출 중', value: lendingRecords.filter(r => r.status === 'lending').length, icon: History },
    { label: '누적 반납 완료', value: lendingRecords.filter(r => r.status === 'returned').length, icon: CheckCircle2 },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          {[
            { id: 'overview', label: '대시보드', icon: BarChart3 },
            { id: 'inventory', label: '재고 관리', icon: Package },
            { id: 'blog', label: '콘텐츠 관리', icon: FileText },
            { id: 'settings', label: '사이트 설정', icon: SettingsIcon },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                activeTab === tab.id 
                  ? "bg-brand-khaki text-white shadow-lg shadow-brand-khaki/20" 
                  : "text-brand-dark/60 hover:bg-white"
              )}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 min-h-[70vh] border border-brand-khaki/5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-12">
                  <h2 className="text-3xl font-serif font-bold text-brand-khaki">학생 운영진 대시보드</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl border border-brand-khaki/5 shadow-sm">
                        <stat.icon className="h-6 w-6 text-brand-khaki mb-4" />
                        <p className="text-sm text-brand-dark/40 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-brand-dark">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-3xl p-8 border border-brand-khaki/5 overflow-hidden">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                       <History className="h-5 w-5 text-brand-khaki" />최근 대출 현황
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="border-b border-brand-khaki/10 text-brand-dark/40 uppercase text-xs tracking-wider">
                          <tr>
                            <th className="pb-4 font-semibold">신청자</th>
                            <th className="pb-4 font-semibold">씨앗</th>
                            <th className="pb-4 font-semibold">대출일</th>
                            <th className="pb-4 font-semibold">상태</th>
                            <th className="pb-4 font-semibold">작업</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-khaki/5">
                          {lendingRecords.map(record => {
                            const seed = seeds.find(s => s.id === record.seedId);
                            return (
                              <tr key={record.id} className="text-sm">
                                <td className="py-4 font-medium">{record.borrowerName}</td>
                                <td className="py-4 text-brand-dark/60">{seed?.name || '정보 없음'}</td>
                                <td className="py-4 text-brand-dark/60">{record.lendingDate}</td>
                                <td className="py-4">
                                  <span className={cn(
                                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                    record.status === 'lending' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                                  )}>
                                    {record.status === 'lending' ? '대출 중' : '반납 완료'}
                                  </span>
                                </td>
                                <td className="py-4">
                                  {record.status === 'lending' && (
                                    <button 
                                      onClick={() => returnSeed(record.id)}
                                      className="text-brand-khaki hover:underline font-bold text-xs"
                                    >
                                      반납 처리
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-serif font-bold text-brand-khaki">씨앗 재고 관리</h2>
                    <button 
                      onClick={() => setIsAddingSeed(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-khaki text-white rounded-xl shadow-lg shadow-brand-khaki/20 hover:bg-brand-dark transition-all"
                    >
                      <Plus className="h-4 w-4" /> 씨앗 추가
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seeds.map(seed => (
                      <div key={seed.id} className="bg-white p-4 rounded-[2rem] border border-brand-khaki/5 flex gap-4">
                        <img src={seed.image} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold truncate">{seed.name}</h4>
                          <p className="text-xs text-brand-dark/40 mb-2">{seed.category} • 재고: {seed.quantity}</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditingSeed(seed)}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => deleteSeed(seed.id)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add/Edit Seed Form */}
                  {(isAddingSeed || editingSeed) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
                      <div className="bg-white rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-serif font-bold mb-6">
                          {isAddingSeed ? '새 씨앗 등록' : '씨앗 정보 수정'}
                        </h3>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const data = {
                            name: formData.get('name') as string,
                            category: formData.get('category') as string,
                            quantity: parseInt(formData.get('quantity') as string),
                            description: formData.get('description') as string,
                            image: formData.get('image') as string,
                          };
                          
                          if (isAddingSeed) addSeed(data);
                          else if (editingSeed) updateSeed({ ...data, id: editingSeed.id });
                          
                          setIsAddingSeed(false);
                          setEditingSeed(null);
                        }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-1">
                            <label className="text-xs font-bold mb-1 block">씨앗 이름</label>
                            <input name="name" defaultValue={editingSeed?.name} required className="w-full px-4 py-2 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div>
                            <label className="text-xs font-bold mb-1 block">카테고리</label>
                            <input name="category" defaultValue={editingSeed?.category} required className="w-full px-4 py-2 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div>
                            <label className="text-xs font-bold mb-1 block">수량</label>
                            <input name="quantity" type="number" defaultValue={editingSeed?.quantity} required className="w-full px-4 py-2 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-xs font-bold mb-1 block">이미지 URL</label>
                            <input name="image" defaultValue={editingSeed?.image} required className="w-full px-4 py-2 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-xs font-bold mb-1 block">설명</label>
                            <textarea name="description" defaultValue={editingSeed?.description} required rows={3} className="w-full px-4 py-2 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div className="md:col-span-2 flex gap-4 pt-4">
                            <button type="button" onClick={() => {setIsAddingSeed(false); setEditingSeed(null);}} className="flex-1 py-3 border border-brand-khaki/10 text-brand-dark/40 rounded-xl">취소</button>
                            <button type="submit" className="flex-1 py-3 bg-brand-khaki text-white rounded-xl">저장하기</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'blog' && (
                 <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-serif font-bold text-brand-khaki">활동 소식 관리</h2>
                    <button 
                      onClick={() => setIsAddingPost(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-khaki text-white rounded-xl"
                    >
                      <Plus className="h-4 w-4" /> 게시글 작성
                    </button>
                  </div>

                  <div className="space-y-4">
                    {posts.map(post => (
                      <div key={post.id} className="bg-white p-4 rounded-3xl border border-brand-khaki/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {post.image && <img src={post.image} className="w-16 h-16 rounded-xl object-cover" />}
                          <div>
                            <h4 className="font-bold">{post.title}</h4>
                            <p className="text-xs text-brand-dark/40">{post.date} • {post.author}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingPost(post)} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deletePost(post.id)} className="p-2 bg-red-50 text-red-600 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add/Edit Post Form */}
                  {(isAddingPost || editingPost) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
                      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-serif font-bold mb-6">{isAddingPost ? '새 게시글 작성' : '게시글 수정'}</h3>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const data = {
                            title: formData.get('title') as string,
                            content: formData.get('content') as string,
                            author: formData.get('author') as string,
                            image: formData.get('image') as string,
                            date: editingPost?.date || new Date().toISOString().split('T')[0],
                            tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
                          };
                          if (isAddingPost) addPost(data);
                          else if (editingPost) updatePost({ ...data, id: editingPost.id });
                          setIsAddingPost(false);
                          setEditingPost(null);
                        }} className="space-y-4">
                          <div>
                            <label className="text-xs font-bold mb-1 block">제목</label>
                            <input name="title" defaultValue={editingPost?.title} required className="w-full px-4 py-3 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold mb-1 block">작성자</label>
                              <input name="author" defaultValue={editingPost?.author} required className="w-full px-4 py-3 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                            </div>
                            <div>
                              <label className="text-xs font-bold mb-1 block">태그 (쉼표로 구분)</label>
                              <input name="tags" defaultValue={editingPost?.tags.join(', ')} placeholder="공지, 식물" className="w-full px-4 py-3 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold mb-1 block">대표 이미지 URL</label>
                            <input name="image" defaultValue={editingPost?.image} className="w-full px-4 py-3 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div>
                            <label className="text-xs font-bold mb-1 block">내용</label>
                            <textarea name="content" defaultValue={editingPost?.content} required rows={8} className="w-full px-4 py-3 bg-brand-beige/20 border border-brand-khaki/10 rounded-xl" />
                          </div>
                          <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => {setIsAddingPost(false); setEditingPost(null);}} className="flex-1 py-3 border border-brand-khaki/10 text-brand-dark/40 rounded-xl">취소</button>
                            <button type="submit" className="flex-1 py-3 bg-brand-khaki text-white rounded-xl">발행하기</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-serif font-bold text-brand-khaki">사이트 설정</h2>
                  <form onSubmit={handleSaveSettings} className="max-w-xl space-y-6">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">사이트 이름</label>
                      <input 
                        value={localSettings.title}
                        onChange={(e) => setLocalSettings({...localSettings, title: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-brand-khaki/10 rounded-xl focus:ring-2 focus:ring-brand-khaki/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">사이트 설명</label>
                      <textarea 
                        rows={3}
                        value={localSettings.description}
                        onChange={(e) => setLocalSettings({...localSettings, description: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-brand-khaki/10 rounded-xl focus:ring-2 focus:ring-brand-khaki/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">메인트 컬러 (Hex)</label>
                        <div className="flex gap-2">
                          <input 
                            type="color"
                            value={localSettings.primaryColor}
                            onChange={(e) => setLocalSettings({...localSettings, primaryColor: e.target.value})}
                            className="h-12 w-12 rounded-lg border-0 p-0 overflow-hidden cursor-pointer"
                          />
                          <input 
                            type="text"
                            value={localSettings.primaryColor}
                            onChange={(e) => setLocalSettings({...localSettings, primaryColor: e.target.value})}
                            className="flex-1 px-4 py-3 bg-white border border-brand-khaki/10 rounded-xl uppercase"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">글꼴 설정</label>
                        <select 
                          value={localSettings.fontFamily}
                          onChange={(e) => setLocalSettings({...localSettings, fontFamily: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-brand-khaki/10 rounded-xl"
                        >
                          <option value="serif">세리프 (우아한 느낌)</option>
                          <option value="sans">산세리프 (깔끔한 느낌)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 bg-brand-khaki text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all"
                      >
                        <Save className="h-5 w-5" /> 변경사항 저장
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
