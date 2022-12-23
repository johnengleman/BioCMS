import { createGetInitialProps } from '@mantine/next'
import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'

const getInitialProps = createGetInitialProps()
export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://kit.fontawesome.com/76900a3b53.js"
            strategy="beforeInteractive"
          ></Script>
        </body>
      </Html>
    )
  }
}
