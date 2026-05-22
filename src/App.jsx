import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const Home = React.lazy(() => import('./pages/Home'))
const FiliTV = React.lazy(() => import('./pages/FiliTV'))
const Coding = React.lazy(() => import('./pages/Coding'))
const DailyTree = React.lazy(() => import('./pages/DailyTree'))
const WordUniverse = React.lazy(() => import('./pages/WordUniverse'))

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          fontSize: '1.125rem',
          color: 'var(--secondary)',
          fontFamily: 'var(--font-body)'
        }}>
          正在加载...
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/fili-tv" element={<FiliTV />} />
          <Route path="/projects/coding" element={<Coding />} />
          <Route path="/projects/daily-tree" element={<DailyTree />} />
          <Route path="/projects/word-universe" element={<WordUniverse />} />
        </Routes>
      </Suspense>
    </>
  )
}

