import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-[#0a0a0a] text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
