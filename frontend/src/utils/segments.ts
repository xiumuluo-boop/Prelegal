export interface TextSegment {
  text: string;
  bold?: boolean;
  link?: boolean;
}

const TOKEN_RE = /\*\*(.+?)\*\*|\{\{link\}\}(.+?)\{\{\/link\}\}/g;

/** Splits a string containing `**bold**` and `{{link}}...{{/link}}` markup into renderable segments. */
export function parseSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ text: match[1], bold: true });
    } else if (match[2] !== undefined) {
      segments.push({ text: match[2], link: true });
    }
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex) });
  }
  return segments;
}
