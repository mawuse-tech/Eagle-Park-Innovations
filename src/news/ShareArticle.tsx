'use client';
import { useState } from 'react';

export default function ShareArticle() {
  const [message, setMessage] = useState('');
  async function share() {
    const data = { title: document.title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); setMessage('Link copied'); window.setTimeout(() => setMessage(''), 2200); }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setMessage('Unable to share this link'); window.setTimeout(() => setMessage(''), 2600);
    }
  }
  return <div className="news-story-share"><button type="button" onClick={() => void share()}><i className="ri-share-line" aria-hidden="true"/> Share article</button>{message && <span role="status">{message}</span>}</div>;
}
