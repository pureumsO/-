import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';
import { cn } from '../lib/utils.ts';

export default function Catalog() {
  const { seeds, lendSeed } = useAppContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('전체');
  const [lendingSeed, setLendingSeed] = React.useState<string | null>(null);
  const [borrowerName, setBorrowerName] = React.useState('');

  const categories = ['전체', ...Array.from(new Set(seeds.map(s => s.category)))];

  const filteredSeeds = seeds.filter(seed => {
    const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         seed.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || seed.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLend = (e: React.FormEvent) => {
    e.preventDefault();
    if (lendingSeed && borrowerName) {
      lendSeed(lendingSeed, borrowerName);
      setLendingSeed(null);
      setBorrowerName('');
      alert('대출 신청이 완료되었습니다!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-brand-khaki">대출 및 반납</h1>
        <p className="text-brand-dark/60 max-w-2xl mx-auto">
          다양한 종류의 씨앗들이 여러분을 기다리고 있습니다. 
          키우고 싶은 씨앗을 골라 대출 신청을 해주세요.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-dark/40" />
          <input
            type="text"
            placeholder="씨앗 이름 또는 설명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-khaki/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-khaki/20"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                selectedCategory === cat 
                  ? "bg-brand-khaki text-white shadow-lg shadow-brand-khaki/20" 
                  : "bg-white text-brand-dark/60 hover:bg-brand-khaki/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredSeeds.map((seed) => (
          <motion.div 
            layout
            key={seed.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group bg-white rounded-3xl overflow-hidden border border-brand-khaki/5 transition-all shadow-sm hover:shadow-xl"
          >
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={seed.image} 
                alt={seed.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              {seed.quantity === 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold bg-red-500 px-4 py-1 rounded-full text-sm">재고 없음</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{seed.name}</h3>
                <span className="text-brand-khaki text-xs font-bold uppercase tracking-widest">{seed.category}</span>
              </div>
              <p className="text-brand-dark/60 text-sm mb-4 line-clamp-2 h-10">
                {seed.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-brand-dark/40">잔여 수량: {seed.quantity}개</span>
                <button 
                  disabled={seed.quantity === 0}
                  onClick={() => setLendingSeed(seed.id)}
                  className="p-2 rounded-full bg-brand-beige text-brand-khaki hover:bg-brand-khaki hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lend Modal */}
      {lendingSeed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <h2 className="text-2xl font-serif font-bold mb-4">씨앗 대출 신청</h2>
            <p className="text-brand-dark/60 mb-6 text-sm">
              선택하신 씨앗을 대출하시겠습니까? <br />
              씨앗을 심고 수확한 후에는 다시 소중한 씨앗 한 알을 도서관에 돌려주세요.
            </p>
            <form onSubmit={handleLend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-brand-dark/70">신청자 이름</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-beige/30 border border-brand-khaki/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-khaki/20"
                  placeholder="본인 이름을 적어주세요"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setLendingSeed(null)}
                  className="flex-1 py-3 border border-brand-khaki/20 text-brand-khaki rounded-xl font-medium hover:bg-brand-khaki/5"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-brand-khaki text-white rounded-xl font-medium hover:bg-brand-dark transition-all"
                >
                  신청하기
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
