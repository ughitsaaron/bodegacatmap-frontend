import createEmotionCache from '@emotion/cache';
import Document, { Head, Html, Main, NextScript } from 'next/document';

function createEmotionClientCache() {
  return createEmotionCache({ key: 'css', prepend: true });
}

export default class BodegaCatsDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            crossOrigin=""
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            rel="stylesheet"
          />
          <link
            crossOrigin=""
            href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
