module.exports = {
  client: {
    service: {
      name: 'bodegacats-graphql',
      localSchemaFile: './generated/graphql.schema.json',
      url: 'http://localhost:4000/graphql',
    },
    includes: ['**/*.graphql'],
  },
};
