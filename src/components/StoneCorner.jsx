import { useState } from 'react'
import { blogUrl } from '../config'

export default function StoneCorner() {
  const [greeted, setGreeted] = useState(false)
  return (
    <section className="stone-corner" aria-labelledby="stone-corner-title">
      <h2 id="stone-corner-title">Stone 的一角</h2>
      <p className="corner-intro">读几页书，听一段谈话，再把一个想法做出来。</p>
      <div className="corner-scene">
        <img src={`${import.meta.env.BASE_URL}shots/stone-corner.webp`} width="1536" height="1024" loading="lazy" alt="一张阅读与创作的书桌：打开的书、电脑、耳机、手写便笺，以及一块陶土橙的小石头。" />
        <a className="corner-object corner-books" href={blogUrl('categories/书评.html')} target="_blank" rel="noopener noreferrer" aria-label="打开书评"><span>读书评 ↗</span></a>
        <a className="corner-object corner-computer" href="/#cases" aria-label="回到作品区"><span>看作品 ↑</span></a>
        <a className="corner-object corner-headphones" href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer" aria-label="打开游荡集"><span>游荡集 ↗</span></a>
        <a className="corner-object corner-note" href="/moments" aria-label="看看最近的动态"><span>读动态 →</span></a>
        <button className="corner-object corner-pebble" onClick={() => setGreeted(value => !value)} aria-label="和小石头打个招呼" aria-pressed={greeted}><span>打个招呼</span></button>
      </div>
      <p className="corner-message" role="status">{greeted ? '你好，我是石头。谢谢你逛到这里，愿你今天也有一个小小的发现。' : '点点书、电脑、耳机，或者和小石头打个招呼。'}</p>
    </section>
  )
}
