// src/utils/helpers.js

/**
 * Strip all HTML tags from a string and return plain text.
 */
export function stripHtml(html = '') {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract a readable excerpt (max N chars) from HTML content.
 */
export function getExcerpt(html = '', maxLen = 180) {
  const text = stripHtml(html);
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

/**
 * Format an ISO date string to a readable format (e.g. "21 May 2026").
 */
export function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Estimate reading time (words / 200 wpm).
 */
export function readingTime(html = '') {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

/**
 * Extract first image URL from HTML content.
 */
export function extractFirstImage(html = '') {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Detect genre/tag from post title using keyword mapping.
 */
const GENRE_MAP = [
  { keywords: ['sci-fi', 'science fiction', 'space', 'interstellar', 'galaxy', 'robot', 'android', 'cyber', 'quantum'], tag: 'Sci-Fi', color: 'tag-sci-fi' },
  { keywords: ['cyberpunk', 'neon', 'digital', 'hacker', 'virtual', 'matrix', 'tech-noir'], tag: 'Cyberpunk', color: 'tag-cyberpunk' },
  { keywords: ['steampunk', 'clockwork', 'steam', 'victorian', 'gear', 'clockmaker'], tag: 'Steampunk', color: 'tag-steampunk' },
  { keywords: ['poetry', 'puisi', 'sajak', 'verse', 'poem', 'pantun'], tag: 'Poetry', color: 'tag-poetry' },
  { keywords: ['fantasy', 'alchemist', 'magic', 'spell', 'mythical', 'dragon', 'wizard'], tag: 'Fantasy', color: 'tag-fantasy' },
  { keywords: ['romance', 'love', 'cinta', 'rindu', 'asmara', 'tabu', 'heart'], tag: 'Romance', color: 'tag-romance' },
  { keywords: ['horror', 'ghost', 'haunted', 'terror', 'dark', 'fear'], tag: 'Horror', color: 'tag-horror' },
  { keywords: ['surreal', 'surrealism', 'dream', 'memory', 'cafe', 'lucid'], tag: 'Surrealism', color: 'tag-surreal' },
  { keywords: ['post-apocalyptic', 'apocalypse', 'wasteland', 'end of the world', 'midnight radio'], tag: 'Post-Apoc', color: 'tag-postapoc' },
  { keywords: ['folklore', 'batik', 'legend', 'myth', 'traditional', 'cultural', 'keroncong', 'wayang'], tag: 'Folklore', color: 'tag-folklore' },
  { keywords: ['campus', 'event', 'kegiatan', 'berita', 'info', 'hima', 'unissula', 'mahasiswa'], tag: 'Campus', color: 'tag-campus' },
];

export function detectGenre(title = '', labels = []) {
  const lower = title.toLowerCase();

  // Check labels first
  for (const label of labels) {
    const lbl = label.toLowerCase();
    for (const g of GENRE_MAP) {
      if (g.keywords.some(k => lbl.includes(k))) return { tag: g.tag, color: g.color };
    }
  }

  // Check title
  for (const g of GENRE_MAP) {
    if (g.keywords.some(k => lower.includes(k))) return { tag: g.tag, color: g.color };
  }

  return { tag: 'Literature', color: 'tag-default' };
}

export const TAG_COLORS = {
  'tag-sci-fi':    'bg-indigo-100 text-indigo-700 border-indigo-200',
  'tag-cyberpunk': 'bg-violet-100 text-violet-700 border-violet-200',
  'tag-steampunk': 'bg-amber-100 text-amber-700 border-amber-200',
  'tag-poetry':    'bg-pink-100 text-pink-700 border-pink-200',
  'tag-fantasy':   'bg-emerald-100 text-emerald-700 border-emerald-200',
  'tag-romance':   'bg-rose-100 text-rose-600 border-rose-200',
  'tag-horror':    'bg-red-100 text-red-700 border-red-200',
  'tag-surreal':   'bg-purple-100 text-purple-700 border-purple-200',
  'tag-postapoc':  'bg-orange-100 text-orange-700 border-orange-200',
  'tag-folklore':  'bg-yellow-100 text-yellow-700 border-yellow-200',
  'tag-campus':    'bg-sky-100 text-sky-700 border-sky-200',
  'tag-default':   'bg-pink-50 text-pink-600 border-pink-100',
};

/**
 * All unique genre tags (for filter pills).
 */
export const ALL_GENRES = [
  'All', 'Sci-Fi', 'Cyberpunk', 'Steampunk', 'Poetry', 'Fantasy',
  'Romance', 'Surrealism', 'Post-Apoc', 'Folklore', 'Campus',
];
