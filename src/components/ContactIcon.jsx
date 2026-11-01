export default function ContactIcon({ type }) {
  const paths = {
    mail: 'M3 5h18v14H3z M3 5l9 7 9-7',
    book: 'M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1z M12 5v15',
    telegram: 'M21 3L3 10l7 3 3 8 8-18z M10 13l11-10 M13 21l2-6',
    github: 'M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.8a3.3 3.3 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.5-3.7 4.9 4.9 0 0 0-.1-3.7S17.5 1 15 2.8a12.8 12.8 0 0 0-6 0C6.5 1 5.3 1.4 5.3 1.4a4.9 4.9 0 0 0-.1 3.7A5.3 5.3 0 0 0 3.7 9c0 5.3 3.2 6.5 6.2 6.8a3.3 3.3 0 0 0-.9 2.6V22',
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[type]} /></svg>
}
