import dynamic from 'next/dynamic';

const CatPage = dynamic(async () => (await import('./cat')).default, { ssr: false });

export default CatPage;
