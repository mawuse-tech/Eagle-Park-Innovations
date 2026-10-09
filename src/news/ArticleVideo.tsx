'use client';
import { useState } from 'react';
import { getVideoDetails } from './video';

export default function ArticleVideo({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const video = getVideoDetails(url);
  if (!video) return null;
  if (playing || !video.thumbnailUrl) return <div className="article-video-frame"><iframe src={`${video.embedUrl}${playing ? '&autoplay=1' : ''}`} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div>;
  return <div className="article-video-poster"><img src={video.thumbnailUrl} alt="" loading="lazy"/><button type="button" aria-label={`Play video: ${title}`} onClick={() => setPlaying(true)}><i className="ri-play-fill" aria-hidden="true"/></button></div>;
}
