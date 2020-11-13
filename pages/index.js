import React from 'react'
import MediaList from '../components/MediaList'
import Nav from '../components/Nav'
import PageTitle from '../components/PageTitle'

const Home = () => {
  return (
    <div className="page">
      <PageTitle status="current" />
      <Nav />
      <MediaList status="current" />
    </div>
  )
}

export default Home
