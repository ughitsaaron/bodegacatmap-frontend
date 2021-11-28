import React from 'react';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class BodegaCatsDocument extends Document {
  static async getInitialProps(context) {
    const styleSheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => styleSheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(context);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styleSheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      styleSheet.seal();
    }
  }
}
