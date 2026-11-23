import { useRef, useState } from 'react'
import { ghUrl } from '../config'

const BASE = import.meta.env.BASE_URL

const photos = [
  {
    id: 'health',
    src: `${BASE}shots/health-heystone.webp`,
    alt: '懂点健康网站首页：用图解、动画和证据真正懂点健康',
    caption: '懂点健康 · 用图解与证据懂点健康',
    href: 'https://health.heystone.site/',
    linkLabel: '打开懂点健康，体验谣言法庭与身体百科',
  },
  {
    id: 'youdang',
    src: `${BASE}shots/youdang.png`,
    alt: '游荡集网站预览：海浪背景与播客精读主题',
    caption: '游荡集 · 把播客读成一本书',
    href: 'https://youdang.heystone.site/',
    linkLabel: '打开游荡集，阅读播客精读',
  },
  {
    id: 'quest',
    src: `${BASE}shots/quest-960.webp`,
    srcSet: `${BASE}shots/quest-960.webp 960w, ${BASE}shots/quest-1920.webp 1920w`,
    alt: 'Product Quest 星火岛的游戏实景',
    caption: 'Product Quest · 星火岛实景',
    href: ghUrl('Product-quest/'),
    linkLabel: '新窗口打开 Product Quest 星火岛',
  },
  {
    id: 'research',
    src: `${BASE}shots/research-edition.webp`,
    alt: 'Research Edition 首页：AI 产业长文与报告',
    caption: 'Research Edition · 深度阅读室',
    href: 'https://read.heystone.site',
    linkLabel: '打开 Research Edition 深度阅读室',
  },
]

export default function HeroPhotoStack() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [flipCount, setFlipCount] = useState(0)
  const touchStartRef = useRef(null)
  const swipedRef = useRef(false)

  const current = photos[index]
  const nextPhoto = photos[(index + 1) % photos.length]
  const backPhoto = photos[(index + 2) % photos.length]

  const step = (delta) => {
    setDirection(delta >= 0 ? 1 : -1)
    setIndex((prev) => (prev + delta + photos.length) % photos.length)
    setFlipCount((c) => c + 1)
  }

  const handlePhotoClick = () => {
    if (swipedRef.current) {
      swipedRef.current = false
      return
    }
    step(1)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    const t = e.touches[0]
    touchStartRef.current = { x: t.clientX, y: t.clientY }
    swipedRef.current = false
  }

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStartRef.current.x
    const dy = t.clientY - touchStartRef.current.y
    touchStartRef.current = null
    if (Math.abs(dx) >= 36 && Math.abs(dx) > Math.abs(dy)) {
      swipedRef.current = true
      step(dx < 0 ? 1 : -1)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    }
  }

  return (
    <figure className="hero-shot hero-stack in-3" onKeyDown={handleKeyDown}>
      <div className="hero-stack-stage">
        {/* 后两张只露出微斜纸角，像书桌上随手叠着的作品照 */}
        <button
          type="button"
          className="hero-stack-card hero-stack-back"
          onClick={() => step(-1)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={backPhoto.src}
            alt=""
            width="1280"
            height="720"
            loading="eager"
            decoding="async"
          />
          <span className="hero-stack-mat" />
        </button>

        <button
          type="button"
          className="hero-stack-card hero-stack-mid"
          onClick={() => step(1)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={nextPhoto.src}
            alt=""
            width="1280"
            height="720"
            loading="eager"
            decoding="async"
          />
          <span className="hero-stack-mat" />
        </button>

        <div className="hero-stack-card hero-stack-front">
          <button
            type="button"
            className="hero-photo-flip"
            onClick={handlePhotoClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label={`当前第 ${index + 1} 张，共 ${photos.length} 张作品照：${current.caption}。点击或左右轻扫翻看下一张`}
          >
            <span
              key={`${current.id}-${flipCount}`}
              className={`hero-photo-frame${flipCount > 0 ? (direction > 0 ? ' is-entering-next' : ' is-entering-prev') : ''}`}
            >
              <img
                src={current.src}
                srcSet={current.srcSet}
                sizes="(max-width: 900px) 92vw, 440px"
                alt={current.alt}
                width="1280"
                height="720"
              />
            </span>
          </button>

          <figcaption className="hero-stack-caption">
            <a
              className="hero-caption-link"
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={current.linkLabel}
            >
              <span>{current.caption}</span>
              <span aria-hidden="true"> ↗</span>
            </a>
            <button
              type="button"
              className="hero-flip-btn"
              onClick={() => step(1)}
              aria-label={`翻看下一张作品照（当前第 ${index + 1} 张，共 ${photos.length} 张）`}
            >
              <span className="hero-flip-count">{index + 1}/{photos.length}</span>
              <span className="hero-flip-label">翻一张</span>
            </button>
          </figcaption>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        当前作品照：{current.caption}（第 {index + 1} 张，共 {photos.length} 张）
      </p>
    </figure>
  )
}
