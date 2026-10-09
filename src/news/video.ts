const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com']);
const VIMEO_HOSTS = new Set(['vimeo.com', 'www.vimeo.com', 'player.vimeo.com']);

export interface VideoDetails { embedUrl: string; thumbnailUrl: string | null; }
export function getVideoDetails(value: string): VideoDetails | null {
  if (!value.trim()) return null;
  let url: URL;
  try { url = new URL(value); } catch { return null; }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  const host = url.hostname.toLowerCase();
  if (YOUTUBE_HOSTS.has(host)) {
    const id = host === 'youtu.be' ? url.pathname.split('/').filter(Boolean)[0] : url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
    return id && /^[A-Za-z0-9_-]{6,20}$/.test(id) ? { embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`, thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` } : null;
  }
  if (VIMEO_HOSTS.has(host)) {
    const id = url.pathname.match(/(?:^|\/)video\/(\d+)(?:\/|$)/)?.[1] || url.pathname.match(/(?:^|\/)(\d+)(?:\/|$)/)?.[1];
    return id ? { embedUrl: `https://player.vimeo.com/video/${id}`, thumbnailUrl: null } : null;
  }
  return null;
}

export function getVideoEmbedUrl(value: string): string | null {
  return getVideoDetails(value)?.embedUrl ?? null;
}
