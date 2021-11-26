import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import type { AppProps } from 'next/app';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink(),
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
