import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1" />
          <meta
            name="description"
            content="名取さなのヌォンタートが集まるサイト"
          />

          <meta property="og:title" content="ヌォンタート展覧会" />
          <meta
            property="og:description"
            content="名取さなのヌォンタートが集まるサイト"
          />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://sana.natori.dev" />
          <meta
            property="og:image"
            content="https://sana.natori.dev/images/thumbnail.png"
          />
          <link ref="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
