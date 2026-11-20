import { useState } from 'react'
import { blogUrl } from '../config'

const MESSAGES = {
  idle: '点亮桌上的台灯，或者戳一下桌角那块陶土色的小石头打个招呼。',
  lampOn: '暖灯亮起来了，光正好落在摊开的书页上。书房门虚掩着，随时欢迎再来坐会儿。',
  lampOff: '台灯先熄上了。桌角那块陶土色的小石头，也可以戳一下打个招呼。',
  pebble: '你好呀，我是石头。谢谢你一路逛到这里，愿你今天也有一个小小的发现，常来玩。',
}

export default function StoneCorner() {
  const [lampOn, setLampOn] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [messageKey, setMessageKey] = useState('idle')

  const toggleLamp = () => {
    setLampOn((prev) => {
      const next = !prev
      setMessageKey(next ? 'lampOn' : 'lampOff')
      return next
    })
  }

  const togglePebble = () => {
    setGreeted((prev) => {
      const next = !prev
      setMessageKey(next ? 'pebble' : (lampOn ? 'lampOn' : 'idle'))
      return next
    })
  }

  return (
    <section className={`stone-corner${lampOn ? ' is-lamp-on' : ''}`} id="stone-corner" aria-labelledby="stone-corner-title">
      <h2 id="stone-corner-title">Stone 的一角</h2>
      <p className="corner-intro">逛累了可以坐会儿——点亮桌上的台灯，书、电脑、耳机和便笺也都能随手翻看。</p>
      <div className={`corner-scene${lampOn ? ' is-lamp-on' : ''}`}>
        <img src={`${import.meta.env.BASE_URL}shots/stone-corner.webp`} width="1536" height="1024" loading="lazy" alt="一张阅读与创作的书桌：一盏台灯、打开的书、电脑、耳机、手写便笺，以及一块陶土橙的小石头。" />
        <div className="corner-lamp-glow" aria-hidden="true" />
        <div className="corner-lamp-bloom" aria-hidden="true" />
        <button
          type="button"
          className="corner-object corner-lamp"
          onClick={toggleLamp}
          aria-label={lampOn ? '关掉书桌台灯' : '点亮书桌台灯'}
          aria-pressed={lampOn}
        >
          <span>{lampOn ? '关灯' : '开灯'}</span>
        </button>
        <a className="corner-object corner-books" href={blogUrl('categories/书评.html')} target="_blank" rel="noopener noreferrer" aria-label="打开书评"><span>读书评 ↗</span></a>
        <a className="corner-object corner-computer" href="/#cases" aria-label="回到作品区"><span>看作品 ↑</span></a>
        <a className="corner-object corner-headphones" href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer" aria-label="打开游荡集"><span>游荡集 ↗</span></a>
        <a className="corner-object corner-note" href="/moments" aria-label="看看最近的动态"><span>读动态 →</span></a>
        <button type="button" className="corner-object corner-pebble" onClick={togglePebble} aria-label="和小石头打个招呼" aria-pressed={greeted}><span>打个招呼</span></button>
      </div>
      <nav className="corner-legend" aria-label="桌上的内容入口">
        <button
          type="button"
          className={`corner-lamp-toggle${lampOn ? ' is-on' : ''}`}
          onClick={toggleLamp}
          aria-pressed={lampOn}
        >
          <span className="corner-lamp-dot" aria-hidden="true" />
          {lampOn ? '关掉台灯' : '点亮台灯'}
        </button>
        <a href={blogUrl('categories/书评.html')} target="_blank" rel="noopener noreferrer">书评 ↗</a>
        <a href="/#cases">作品 ↑</a>
        <a href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer">游荡集 ↗</a>
        <a href="/moments">动态 →</a>
      </nav>
      <p className="corner-message" role="status">{MESSAGES[messageKey]}</p>
    </section>
  )
}
