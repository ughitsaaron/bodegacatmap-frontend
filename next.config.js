/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // api: {
  //   bodyParser: {
  //     sizeLimit: false,
  //   },
  // },
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
        source: '/upload',
        destination: 'http://localhost:4000/upload',
      },
      {
        source: '/images/:width/:height/:id*',
        destination: 'http://localhost:4001/bodegacats/:width/:height/:id*',
      },
    ];
  },
};
