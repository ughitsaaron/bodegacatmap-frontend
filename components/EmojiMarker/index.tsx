import dynamic from 'next/dynamic';

export const EmojiMarker = dynamic(async () => (await import('./EmojiMarker')).EmojiMarker, {
  ssr: false,
});
