import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/webfont.css'
import Head from 'next/head'


// добавляем стили глобально

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Сalendar</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
