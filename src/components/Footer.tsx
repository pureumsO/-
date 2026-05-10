import React from 'react';
import { Sprout, Instagram, Youtube, Mail } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';

export default function Footer() {
  const { settings } = useAppContext();
  
  return (
    <footer className="bg-white border-t border-brand-khaki/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-6 w-6 text-brand-khaki" />
              <span className="text-xl font-serif font-bold text-brand-khaki">
                {settings.title}
              </span>
            </div>
            <p className="text-brand-dark/60 max-w-md">
              {settings.description}
              <br />
              함평초등학교 학생들이 함께 만들어가는 작은 생태계입니다.
              씨앗을 빌려가고, 정성껏 키워 다시 씨앗으로 되돌려주세요.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-brand-khaki uppercase tracking-wider mb-4">링크</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-brand-dark/60 hover:text-brand-khaki transition-colors">홈</a></li>
              <li><a href="/catalog" className="text-brand-dark/60 hover:text-brand-khaki transition-colors">대출 및 반납</a></li>
              <li><a href="/blog" className="text-brand-dark/60 hover:text-brand-khaki transition-colors">활동 소식</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-brand-khaki uppercase tracking-wider mb-4">소셜 미디어</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-brand-beige text-brand-khaki hover:bg-brand-khaki hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-brand-beige text-brand-khaki hover:bg-brand-khaki hover:text-white transition-all">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="mailto:contact@hampyeong-seed.edu" className="p-2 rounded-full bg-brand-beige text-brand-khaki hover:bg-brand-khaki hover:text-white transition-all">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-brand-khaki/5 text-center text-brand-dark/40 text-sm">
          <p>© {new Date().getFullYear()} 함평초 4-1 씨앗도서관. All rights reserved.</p>
          <p className="mt-1">함평초등학교 4학년 1반 학생 운영위원회 제작</p>
        </div>
      </div>
    </footer>
  );
}
