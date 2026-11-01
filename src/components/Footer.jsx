export default function Footer({ light = false }) {
  return (
    <footer className={`footer${light ? ' footer-light' : ''}`}>
      <p>© 2026 stone · 朱鑫垚 · 为 AI 世界留一点人味</p>
    </footer>
  )
}
