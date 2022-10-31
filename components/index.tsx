import dynamic from 'next/dynamic';
import { LoadingIndicator } from './LoadingIndicator';

export const Map = dynamic(async () => (await import('./Map')).Map, {
  ssr: false,
  loading: ({ isLoading }) => {
    return <LoadingIndicator isLoading={isLoading} />;
  },
});

export const CatMarkersList = dynamic(
  async () => (await import('./CatMarkersList')).CatMarkersList,
  {
    ssr: false,
  }
);

export { EmojiMarker } from './EmojiMarker';
export { LoadingIndicator } from './LoadingIndicator';
export { Header } from './Header';
export { Link } from './Link';
