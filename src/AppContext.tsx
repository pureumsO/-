import React, { createContext, useContext, useState, useEffect } from 'react';
import { Seed, Post, SiteSettings, LendingRecord } from './types.ts';
import { INITIAL_SEEDS, INITIAL_POSTS, DEFAULT_SETTINGS } from './constants.ts';
import { db, auth } from './firebase.ts';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  getDoc,
  query,
  limit
} from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AppContextType {
  seeds: Seed[];
  posts: Post[];
  settings: SiteSettings;
  lendingRecords: LendingRecord[];
  isLoading: boolean;
  addSeed: (seed: Omit<Seed, 'id'>) => Promise<void>;
  updateSeed: (seed: Seed) => Promise<void>;
  deleteSeed: (id: string) => Promise<void>;
  addPost: (post: Omit<Post, 'id'>) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updateSettings: (settings: SiteSettings) => Promise<void>;
  lendSeed: (seedId: string, borrowerName: string) => Promise<void>;
  returnSeed: (recordId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [lendingRecords, setLendingRecords] = useState<LendingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Firestore Collections
  const SEEDS_COL = 'seeds';
  const POSTS_COL = 'posts';
  const LENDING_COL = 'lendingRecords';
  const SETTINGS_DOC = 'settings/global';

  // Helper to ensure settings migrations
  const migrateSettings = (data: any): SiteSettings => {
    const updated = { ...data };
    if (updated.title === '함평초 씨앗도서관') {
      updated.title = '함평초 4-1 씨앗도서관';
    }
    if (updated.adminPassword === '0000' || !updated.adminPassword) {
      updated.adminPassword = '4141';
    }
    return updated as SiteSettings;
  };

  useEffect(() => {
    let unsubscribeSeeds: () => void;
    let unsubscribePosts: () => void;
    let unsubscribeRecords: () => void;
    let unsubscribeSettings: () => void;

    async function initFirebase() {
      try {
        // Initial check for data migration or initialization
        const seedsSnap = await getDocs(query(collection(db, SEEDS_COL), limit(1)));
        
        if (seedsSnap.empty) {
          console.log('Initializing Firestore with default data...');
          // Migration from localStorage or defaults
          const localSeeds = localStorage.getItem('seeds');
          const initialSeeds = localSeeds ? JSON.parse(localSeeds) : INITIAL_SEEDS;
          for (const s of initialSeeds) {
            const { id, ...data } = s;
            await setDoc(doc(collection(db, SEEDS_COL), id), data);
          }

          const localPosts = localStorage.getItem('posts');
          const initialPosts = localPosts ? JSON.parse(localPosts) : INITIAL_POSTS;
          for (const p of initialPosts) {
            const { id, ...data } = p;
            await setDoc(doc(collection(db, POSTS_COL), id), data);
          }

          const localSettings = localStorage.getItem('settings');
          const finalSettings = localSettings ? migrateSettings(JSON.parse(localSettings)) : DEFAULT_SETTINGS;
          await setDoc(doc(db, SETTINGS_DOC), finalSettings);

          const localRecords = localStorage.getItem('lendingRecords');
          if (localRecords) {
            const initialRecords = JSON.parse(localRecords);
            for (const r of initialRecords) {
              const { id, ...data } = r;
              await setDoc(doc(collection(db, LENDING_COL), id), data);
            }
          }
        }

        // Setup real-time listeners
        unsubscribeSeeds = onSnapshot(collection(db, SEEDS_COL), 
          (snapshot) => {
            setSeeds(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Seed)));
          },
          (error) => handleFirestoreError(error, OperationType.LIST, SEEDS_COL)
        );

        unsubscribePosts = onSnapshot(collection(db, POSTS_COL), 
          (snapshot) => {
            const fetchedPosts = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Post));
            setPosts(fetchedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
          },
          (error) => handleFirestoreError(error, OperationType.LIST, POSTS_COL)
        );

        unsubscribeRecords = onSnapshot(collection(db, LENDING_COL), 
          (snapshot) => {
            const fetchedRecords = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as LendingRecord));
            setLendingRecords(fetchedRecords.sort((a, b) => new Date(b.lendingDate).getTime() - new Date(a.lendingDate).getTime()));
          },
          (error) => handleFirestoreError(error, OperationType.LIST, LENDING_COL)
        );

        unsubscribeSettings = onSnapshot(doc(db, SETTINGS_DOC), 
          (snapshot) => {
            if (snapshot.exists()) {
              setSettings(migrateSettings(snapshot.data()));
            }
          },
          (error) => handleFirestoreError(error, OperationType.GET, SETTINGS_DOC)
        );

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize Firebase:', error);
      }
    }

    initFirebase();

    return () => {
      if (unsubscribeSeeds) unsubscribeSeeds();
      if (unsubscribePosts) unsubscribePosts();
      if (unsubscribeRecords) unsubscribeRecords();
      if (unsubscribeSettings) unsubscribeSettings();
    };
  }, []);

  // Apply dynamic theme
  useEffect(() => {
    document.documentElement.style.setProperty('--color-brand-khaki', settings.primaryColor);
    document.documentElement.style.setProperty('--font-serif', settings.fontFamily === 'serif' ? '"Cormorant Garamond", ui-serif, Georgia' : '"Inter", sans-serif');
  }, [settings]);

  const addSeed = async (seedData: Omit<Seed, 'id'>) => {
    try {
      await addDoc(collection(db, SEEDS_COL), seedData);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, SEEDS_COL);
    }
  };

  const updateSeed = async (updatedSeed: Seed) => {
    try {
      const { id, ...data } = updatedSeed;
      await updateDoc(doc(db, SEEDS_COL, id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${SEEDS_COL}/${updatedSeed.id}`);
    }
  };

  const deleteSeed = async (id: string) => {
    try {
      await deleteDoc(doc(db, SEEDS_COL, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${SEEDS_COL}/${id}`);
    }
  };

  const addPost = async (postData: Omit<Post, 'id'>) => {
    try {
      await addDoc(collection(db, POSTS_COL), postData);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, POSTS_COL);
    }
  };

  const updatePost = async (updatedPost: Post) => {
    try {
      const { id, ...data } = updatedPost;
      await updateDoc(doc(db, POSTS_COL, id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${POSTS_COL}/${updatedPost.id}`);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, POSTS_COL, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${POSTS_COL}/${id}`);
    }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    try {
      await setDoc(doc(db, SETTINGS_DOC), newSettings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, SETTINGS_DOC);
    }
  };

  const lendSeed = async (seedId: string, borrowerName: string) => {
    try {
      const seedDoc = doc(db, SEEDS_COL, seedId);
      const seedSnap = await getDoc(seedDoc);
      if (seedSnap.exists()) {
        const seed = seedSnap.data() as Omit<Seed, 'id'>;
        if (seed.quantity > 0) {
          const newRecord: Omit<LendingRecord, 'id'> = {
            seedId,
            borrowerName,
            lendingDate: new Date().toISOString().split('T')[0],
            status: 'lending',
          };
          await addDoc(collection(db, LENDING_COL), newRecord);
          await updateDoc(seedDoc, { quantity: seed.quantity - 1 });
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'lendTransaction');
    }
  };

  const returnSeed = async (recordId: string) => {
    try {
      const recordDoc = doc(db, LENDING_COL, recordId);
      const recordSnap = await getDoc(recordDoc);
      if (recordSnap.exists()) {
        const record = recordSnap.data() as Omit<LendingRecord, 'id'>;
        if (record.status === 'lending') {
          const seedDoc = doc(db, SEEDS_COL, record.seedId);
          const seedSnap = await getDoc(seedDoc);
          if (seedSnap.exists()) {
            const seed = seedSnap.data() as Omit<Seed, 'id'>;
            await updateDoc(seedDoc, { quantity: seed.quantity + 1 });
          }
          await updateDoc(recordDoc, {
            status: 'returned',
            returnDate: new Date().toISOString().split('T')[0]
          });
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'returnTransaction');
    }
  };

  return (
    <AppContext.Provider value={{
      seeds, posts, settings, lendingRecords, isLoading,
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
