import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout, Menu, X, Settings } from 'lucide-react';
import { useAppContext } from '../AppContext.tsx';
import { cn } from '../lib/utils.ts';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { settings } = useAppContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: '홈', path: '/' },
    { name: '대출 및 반납', path: '/catalog' },
    { name: '활동 소식', path: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-beige/80 backdrop-blur-md border-b border-brand-khaki/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-brand-khaki" />
              <span className="text-xl font-serif font-bold tracking-tight text-brand-khaki">
                {settings.title}
              </span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-brand-khaki",
                    isActive ? "text-brand-khaki border-b-2 border-brand-khaki" : "text-brand-dark/70"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/admin"
              className="p-2 rounded-full hover:bg-brand-khaki/10 text-brand-khaki transition-colors"
              title="관리자 페이지"
            >
              <Settings className="h-5 w-5" />
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-brand-khaki hover:bg-brand-khaki/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-beige border-b border-brand-khaki/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      isActive ? "bg-brand-khaki text-white" : "text-brand-dark/70 hover:bg-brand-khaki/10"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <NavLink
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-dark/70 hover:bg-brand-khaki/10"
              >
                관리자 페이지
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
