import React, { createContext, useContext, useState, useEffect } from 'react';
import { Seed, Post, SiteSettings, LendingRecord } from './types.ts';
import { INITIAL_SEEDS, INITIAL_POSTS, DEFAULT_SETTINGS } from './constants.ts';

interface AppContextType {
  seeds: Seed[];
  posts: Post[];
  settings: SiteSettings;
  lendingRecords: LendingRecord[];
  addSeed: (seed: Omit<Seed, 'id'>) => void;
  updateSeed: (seed: Seed) => void;
  deleteSeed: (id: string) => void;
  addPost: (post: Omit<Post, 'id'>) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  updateSettings: (settings: SiteSettings) => void;
  lendSeed: (seedId: string, borrowerName: string) => void;
  returnSeed: (recordId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [seeds, setSeeds] = useState<Seed[]>(() => {
    const saved = localStorage.getItem('seeds');
    return saved ? JSON.parse(saved) : INITIAL_SEEDS;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [lendingRecords, setLendingRecords] = useState<LendingRecord[]>(() => {
    const saved = localStorage.getItem('lendingRecords');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('seeds', JSON.stringify(seeds));
  }, [seeds]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('lendingRecords', JSON.stringify(lendingRecords));
  }, [lendingRecords]);

  // Apply dynamic theme
  useEffect(() => {
    document.documentElement.style.setProperty('--color-brand-khaki', settings.primaryColor);
    document.documentElement.style.setProperty('--font-serif', settings.fontFamily === 'serif' ? '"Cormorant Garamond", ui-serif, Georgia' : '"Inter", sans-serif');
  }, [settings]);

  const addSeed = (seedData: Omit<Seed, 'id'>) => {
    const newSeed = { ...seedData, id: Date.now().toString() };
    setSeeds([...seeds, newSeed]);
  };

  const updateSeed = (updatedSeed: Seed) => {
    setSeeds(seeds.map(s => s.id === updatedSeed.id ? updatedSeed : s));
  };

  const deleteSeed = (id: string) => {
    setSeeds(seeds.filter(s => s.id !== id));
  };

  const addPost = (postData: Omit<Post, 'id'>) => {
    const newPost = { ...postData, id: Date.now().toString() };
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const lendSeed = (seedId: string, borrowerName: string) => {
    const seed = seeds.find(s => s.id === seedId);
    if (seed && seed.quantity > 0) {
      const newRecord: LendingRecord = {
        id: Date.now().toString(),
        seedId,
        borrowerName,
        lendingDate: new Date().toISOString().split('T')[0],
        status: 'lending',
      };
      setLendingRecords([newRecord, ...lendingRecords]);
      updateSeed({ ...seed, quantity: seed.quantity - 1 });
    }
  };

  const returnSeed = (recordId: string) => {
    const record = lendingRecords.find(r => r.id === recordId);
    if (record && record.status === 'lending') {
      const seed = seeds.find(s => s.id === record.seedId);
      if (seed) {
        updateSeed({ ...seed, quantity: seed.quantity + 1 });
      }
      setLendingRecords(lendingRecords.map(r => 
        r.id === recordId ? { ...r, status: 'returned', returnDate: new Date().toISOString().split('T')[0] } : r
      ));
    }
  };

  return (
    <AppContext.Provider value={{
      seeds, posts, settings, lendingRecords,
      addSeed, updateSeed, deleteSeed,
      addPost, updatePost, deletePost,
      updateSettings, lendSeed, returnSeed
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
