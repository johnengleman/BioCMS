import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src='https://kit.fontawesome.com/76900a3b53.js'
          strategy='beforeInteractive'
        ></Script>
      </body>
    </Html>
  );
}
