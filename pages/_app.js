import App from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { withApollo } from '../lib/apollo'
import '../css/global.css'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // revalidation is enabled and a new request comes in
  static async getStaticProps(ctx) {
    if (ctx.res) {
      ctx.res.setHeader('Cache-Control', 'maxage=180,s-maxage=60')
    }
    console.log(ctx, ':213')

    let pageProps = {}

    if (Component.getStaticProps) {
      pageProps = await Component.getStaticProps(ctx)
    }

    return {
      props: {
        pageProps,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 10, // In seconds
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props
    console.log(this.props.pageProps, ':1')
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    )
  }
}

export default withApollo({ ssr: true })(App)
