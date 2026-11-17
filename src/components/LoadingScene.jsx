export default function LoadingScene({ title, detail, dark = false }) {
  return <div className={`loading-scene${dark ? ' loading-scene-dark' : ''}`} role="status">
    <svg className="loading-scene-art" viewBox="0 0 160 100" aria-hidden="true">
      <ellipse cx="80" cy="83" rx="50" ry="5" fill="currentColor" opacity=".1" />
      <g className="loading-pebble">
        <path d="M48 67c1-19 14-32 34-32 19 0 32 13 31 32-1 12-13 18-32 18S47 79 48 67Z" fill="currentColor" opacity=".85" />
        <circle cx="70" cy="62" r="2.5" fill="var(--loading-face)" /><circle cx="92" cy="62" r="2.5" fill="var(--loading-face)" />
        <path d="M75 70q6 5 12 0" fill="none" stroke="var(--loading-face)" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="loading-spark" fill="currentColor"><path d="m28 25 2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="m130 18 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/></g>
    </svg>
    <strong>{title}</strong>
    {detail && <span>{detail}</span>}
  </div>
}
