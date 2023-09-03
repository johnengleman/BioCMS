import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import Script from 'next/script'
import Footer from '../components/page/Footer/Footer'
import { ServerStyleSheet } from 'styled-components'
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />), //gets the styles from all the components inside <App>
        })
      const initialProps = await Document.getInitialProps(
        ctx,
      )
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/*👇 insert the collected styles to the html document*/}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://kit.fontawesome.com/76900a3b53.js"
          ></Script>
        </body>
      </Html>
    )
  }
}
