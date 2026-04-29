/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Seed {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  category: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
}

export interface LendingRecord {
  id: string;
  seedId: string;
  borrowerName: string;
  lendingDate: string;
  returnDate?: string;
  status: 'lending' | 'returned';
}

export interface SiteSettings {
  title: string;
  description: string;
  primaryColor: string;
  bgColor: string;
  fontFamily: string;
}
