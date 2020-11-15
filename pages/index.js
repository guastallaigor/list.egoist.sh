import React from 'react'
import MediaList from '../components/MediaList'
import Nav from '../components/Nav'
import PageTitle from '../components/PageTitle'
import mediaListQuery from '../lib/gql/media-list.gql'
import { initializeApollo } from '../lib/apollo'

const Home = ({ pageProps }) => {
  return (
    <div className="page-container">
      <div className="page">
        <PageTitle status="current" />
        <Nav />
        <MediaList status="current" pageProps={pageProps} />
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: mediaListQuery,
    variables: { user: 802131, type: 'ANIME', sort: 'UPDATED_TIME_DESC' },
  })

  return {
    props: {
      pageProps: data,
    },
    revalidate: 12,
  }
}

export default Home
