import Navbar from './components/Navbar'
import Home from './pages/Home'
import Moments from './pages/Moments'

export default function App() {
  return (
    <>
      <Navbar />
      {location.pathname === '/moments' ? <Moments /> : <Home />}
    </>
  )
}
