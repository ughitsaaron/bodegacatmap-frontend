/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:4000/graphql',
      },
      {
        source: '/graphiql',
        destination: 'http://localhost:4000/graphiql',
      },
      {
        source: '/image',
        destination: 'http://localhost:4000/image',
      },
    ];
  },
};
