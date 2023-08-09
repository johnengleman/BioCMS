import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'
import Footer from '../components/global/Footer/Footer'
export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head />
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
