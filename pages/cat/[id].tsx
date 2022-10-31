import dynamic from 'next/dynamic';

const CatPage = dynamic(async () => (await import('./cat')).CatPage, { ssr: false });

export default CatPage;
