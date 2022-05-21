import dynamic from 'next/dynamic';
import { LoadingIndicator } from '../LoadingIndicator';

export const Map = dynamic(async () => (await import('./Map')).Map, {
  ssr: false,
  loading: ({ isLoading }) => {
    return <LoadingIndicator isLoading={isLoading} />;
  },
});
