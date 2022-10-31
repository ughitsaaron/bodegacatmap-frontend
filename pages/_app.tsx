import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRef, Fragment } from 'react';
import type { CSSProperties } from 'react';
import { client } from '../client';
import { Header, Map, CatMarkersList } from '../components';
import { LayoutContext } from '../contexts';

const theme = createTheme({ palette: { mode: 'dark' } });
const mapStyles: CSSProperties = { width: '100%', height: '100%' };

export default function App({ Component, pageProps }: AppProps) {
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  return (
    <>
      <Head>
        <title>Bodega Cats of the World</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <ApolloProvider client={client}>
            <LayoutContext.Provider
              value={{ header: headerRef.current, content: contentRef.current }}
            >
              <Box
                alignItems="center"
                bgcolor="white"
                display="flex"
                flexDirection="column"
                height="100vh"
              >
                <Header ref={headerRef} title="Bodega Cats of NYC" />
                <Map
                  center={[40.73061, -73.935242]}
                  style={mapStyles}
                  zoom={15}
                  zoomControlPosition="bottomright"
                >
                  <CatMarkersList emoji="🐈‍⬛" />
                  <Component {...pageProps} />
                </Map>
                <Box ref={contentRef} />
              </Box>
            </LayoutContext.Provider>
          </ApolloProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
