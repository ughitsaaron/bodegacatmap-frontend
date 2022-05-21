import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import type { Session } from '@auth0/nextjs-auth0';

let accessToken: string;

const authLink = setContext(async (_, { headers }) => {
  if (Boolean(accessToken)) {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  }

  const response = await fetch('http://localhost:3000/api/auth/token', { credentials: 'include' });
  const session: Session = await response.json();

  accessToken = session.idToken;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

function initApolloClient() {
  const httpLink = createHttpLink({ uri: '/graphql' });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include',
  });

  return client;
}

export const client = initApolloClient();
