import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Ubuntu:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <title>euliveiras | blog</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
