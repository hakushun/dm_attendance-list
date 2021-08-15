import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <title>出欠さん</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="出欠さん" />
        <meta name="apple-mobile-web-app-title" content="出欠さん" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#ffb833" />
        <meta name="msapplication-TileColor" content="#ffb833" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-starturl" content="/mypage" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="57x57" href="/pwa/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/pwa/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/pwa/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/pwa/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/pwa/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/pwa/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/pwa/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/pwa/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/pwa/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/pwa/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/pwa/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/pwa/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/pwa/favicon-16x16.png" />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
