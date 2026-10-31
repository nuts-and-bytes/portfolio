import {useEffect,useState} from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Moments from './pages/Moments'
import {currentRoute,internalRoute,navigate,subscribe} from './lib/navigation'

export default function App() {
 const [route,setRoute]=useState(currentRoute)
 const isMoments=route.startsWith('/moments')
 const [visited,setVisited]=useState(isMoments)
 useEffect(()=>{
  const apply=next=>{const value=typeof next==='string'?next:currentRoute();setRoute(value);if(value.startsWith('/moments'))setVisited(true)}
  const click=e=>{const url=internalRoute(e,location.origin);if(url){e.preventDefault();navigate(url)}}
  const unsubscribe=subscribe(apply)
  window.addEventListener('popstate',apply)
  document.addEventListener('click',click)
  return()=>{unsubscribe();window.removeEventListener('popstate',apply);document.removeEventListener('click',click)}
 },[])
 useEffect(()=>{
  const frame=requestAnimationFrame(()=>{const target=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target)target.scrollIntoView();else window.scrollTo(0,0)})
  return()=>cancelAnimationFrame(frame)
 },[route])
 return <><Navbar route={route}/><div hidden={isMoments}><Home/></div>{visited&&<div hidden={!isMoments}><Moments route={route} active={isMoments}/></div>}</>
}
