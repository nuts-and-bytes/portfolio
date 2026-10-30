import {useEffect,useState} from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Moments from './pages/Moments'
import {internalRoute,navigate} from './lib/navigation'

export default function App() {
 const [route,setRoute]=useState(()=>location.pathname+location.search+location.hash)
 const isMoments=route.startsWith('/moments')
 const [visited,setVisited]=useState(isMoments)
 useEffect(()=>{
  const update=()=>{setRoute(location.pathname+location.search+location.hash);if(location.pathname==='/moments')setVisited(true)}
  const click=e=>{const url=internalRoute(e,location.origin);if(url){e.preventDefault();navigate(url)}}
  window.addEventListener('popstate',update);document.addEventListener('click',click)
  return()=>{window.removeEventListener('popstate',update);document.removeEventListener('click',click)}
 },[])
 useEffect(()=>{
  const frame=requestAnimationFrame(()=>{const target=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target)target.scrollIntoView();else window.scrollTo(0,0)})
  return()=>cancelAnimationFrame(frame)
 },[route])
 return <><Navbar route={route}/><div hidden={isMoments}><Home/></div>{visited&&<div hidden={!isMoments}><Moments route={route} active={isMoments}/></div>}</>
}
