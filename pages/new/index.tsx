import dynamic from 'next/dynamic';

const NewPage = dynamic(async () => (await import('./new')).NewPage, { ssr: false });

export default NewPage;
