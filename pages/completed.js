import React from 'react'
import MediaList from '../components/MediaList'
import Nav from '../components/Nav'
import PageTitle from '../components/PageTitle'

const Completed = () => {
  return (
    <div className="page">
      <PageTitle status="completed" />
      <Nav />
      <MediaList status="completed" />
    </div>
  )
}

export default Completed
