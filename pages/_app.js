import Head from 'next/head'
import Router from 'next/router'
import { ApolloProvider } from '@apollo/client'
import NProgress from 'nprogress'
import '../css/global.css'
import { useApollo } from '../lib/apollo'
import withDarkMode, { MODE, useDarkMode } from 'next-dark-mode'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }) => {
  const initialApolloState = pageProps ? pageProps.initialApolloState : null
  const apolloClient = useApollo(initialApolloState)
  const { darkModeActive } = useDarkMode()
  const theme = darkModeActive ? 'dark' : 'light'

  return (
    <>
      <Head>
        <title>@guastallaigor list</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <div className={`app ${theme}`}>
          <Component {...pageProps} theme={theme} />
        </div>
      </ApolloProvider>
    </>
  )
}

export default withDarkMode(App, { defaultMode: MODE.DARK })
