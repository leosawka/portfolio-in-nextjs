import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head >
          <link rel="icon" href="/LS-black.png" media="(prefers-color-scheme: light)"/>
          <link rel="icon" href="/LS-white.png" media="(prefers-color-scheme: dark)"/>
          <title>Portfolio</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
