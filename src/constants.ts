import { Seed, Post, SiteSettings } from './types.ts';

export const COLORS = {
  beige: '#F5F5DC',
  khaki: '#556B2F',
  darkKhaki: '#3D4F21',
  text: '#2C3E50',
};

export const INITIAL_SEEDS: Seed[] = [
  {
    id: '1',
    name: '해바라기 (Sun Flower)',
    description: '키가 크고 밝은 노란색 꽃을 피우는 해바라기 씨앗입니다. 햇빛을 아주 좋아해요.',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=400',
    quantity: 15,
    category: '꽃',
  },
  {
    id: '2',
    name: '방울토마토 (Cherry Tomato)',
    description: '달콤하고 아삭한 방울토마토를 키울 수 있는 씨앗입니다. 베란다에서도 잘 자라요.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307bac?auto=format&fit=crop&q=80&w=400',
    quantity: 10,
    category: '채소',
  },
  {
    id: '3',
    name: '상추 (Lettuce)',
    description: '초보자도 쉽게 키울 수 있는 아삭한 상추 씨앗입니다. 물만 잘 주면 쑥쑥 자라요.',
    image: 'https://images.unsplash.com/photo-1556801712-76c8227d7ca9?auto=format&fit=crop&q=80&w=400',
    quantity: 20,
    category: '채소',
  },
  {
    id: '4',
    name: '라벤더 (Lavender)',
    description: '향기로운 보라색 꽃을 선사하는 라벤더 씨앗입니다. 심신을 안정시켜주는 향이 나요.',
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=400',
    quantity: 8,
    category: '허브',
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '씨앗도서관 오픈 소식!',
    content: '함평초등학교 씨앗도서관이 드디어 문을 열었습니다. 학생 여러분의 많은 참여 바랍니다.',
    date: '2026-04-20',
    author: '운영위원회',
    tags: ['공지', '오픈'],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    title: '해바라기 키우기 꿀팁',
    content: '해바라기는 물을 좋아하지만 물빠짐이 좋아야 해요. 직사광선이 잘 드는 곳에서 키워주세요!',
    date: '2026-04-25',
    author: '식물박사 김철수',
    tags: ['팁', '해바라기'],
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600',
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  title: '함평초 4-1 씨앗도서관',
  description: '씨앗을 빌려주고 마음을 나누는 곳',
  primaryColor: COLORS.khaki,
  bgColor: COLORS.beige,
  fontFamily: 'serif',
};
