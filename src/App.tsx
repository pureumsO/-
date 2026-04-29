/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext.tsx';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Catalog from './pages/Catalog.tsx';
import Blog from './pages/Blog.tsx';
import About from './pages/About.tsx';
import Admin from './pages/Admin.tsx';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="blog" element={<Blog />} />
            <Route path="about" element={<About />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
