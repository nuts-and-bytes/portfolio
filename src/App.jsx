import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const Home = React.lazy(() => import('./pages/Home'))

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
        </Routes>
      </Suspense>
    </>
  )
}

