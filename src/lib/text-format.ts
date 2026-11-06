/** Formats a title or short heading for consistent editorial display. */
export function formatTitle(text: string): string {
  return text.trim().replace(/\s+/g, ' ').toLocaleUpperCase();
}

/** Trims text and capitalizes its first letter without changing the rest. */
export function formatText(text: string): string {
  const trimmed = text.trim();
  return trimmed.replace(/(^|[.!?]\s+|\n\s*)([\p{L}\p{N}])/gu, (_match, boundary: string, first: string) => `${boundary}${first.toLocaleUpperCase()}`);
}
