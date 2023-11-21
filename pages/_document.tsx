import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          {/* Favicon icons */}
          <link
            rel="icon"
            href="/favicons/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />

          {/* Apple Touch Icon */}
          <link
            rel="apple-touch-icon"
            href="/favicons/apple-touch-icon.png"
          />

          {/* Android Chrome Icons */}
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicons/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicons/android-chrome-512x512.png"
          />

          {/* Web App Manifest */}
          <link
            rel="manifest"
            href="/favicons/site.webmanifest"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script src="https://kit.fontawesome.com/76900a3b53.js"></Script>
        </body>
      </Html>
    )
  }
}
