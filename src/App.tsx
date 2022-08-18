import './App.css';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLoading from './AppLoading';
// import ManualIndex from './pages/Manual/Index';
// import HomeIndex from './pages/Home/Index';
// import AboutIndex from './pages/About/Index';
// import NotFound from './NotFound';
const ManualIndex = lazy(() => import('./pages/Manual/Index'));
const HomeIndex = lazy(() => import('./pages/Home/Index'));
const AboutIndex = lazy(() => import('./pages/About/Index'));
const NotFound = lazy(() => import('./NotFound'));
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Suspense fallback={<AppLoading />}><HomeIndex /></Suspense>} />
        <Route path='Manual' element={<Suspense fallback={<AppLoading />}><ManualIndex /></Suspense>} />
        <Route path='About' element={<Suspense fallback={<AppLoading />}><AboutIndex /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<AppLoading />}><NotFound /></Suspense>} />
      </Routes>
    </div>
  );
}

export default App;
