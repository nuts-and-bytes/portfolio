import { useEffect } from 'react'

// 滚动渐显：内容默认可见（无 JS 或 IO 不支持时零损失），
// JS 就绪后才隐藏并交给 IntersectionObserver 渐显。
// rootMargin 提前触发，快速滚动也不会看到空屏。
export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = Array.from(document.querySelectorAll('.rv'))
    const vh = window.innerHeight
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('rv-on')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
    )
    els.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < vh * 0.92) {
        // 已在首屏内：不做动画，直接显示
        el.classList.add('rv-on')
      } else {
        el.classList.add('rv-armed')
        io.observe(el)
      }
    })
    return () => io.disconnect()
  }, [])
}
