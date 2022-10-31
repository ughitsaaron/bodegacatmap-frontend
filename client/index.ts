import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import type { Session } from '@auth0/nextjs-auth0';

let accessToken: string;

const authLink = setContext(async (_, { headers }) => {
  const makeHeaders = (accessToken: string) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (accessToken) {
    return makeHeaders(accessToken);
  }

  const response = await fetch('http://localhost:3000/api/auth/token', { credentials: 'include' });
  const session: Session = await response.json();

  accessToken = session.idToken;

  return makeHeaders(accessToken);
});

function initApolloClient() {
  const httpLink = createHttpLink({ uri: '/graphql' });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    credentials: 'include',
    link: authLink.concat(httpLink),
  });

  return client;
}

export const client = initApolloClient();
