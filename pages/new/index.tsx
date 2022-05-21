import dynamic from 'next/dynamic';

const NewPage = dynamic(async () => (await import('./new')).default, { ssr: false });

export default NewPage;
