import React from 'react'
import MediaList from '../components/MediaList'
import Nav from '../components/Nav'
import PageTitle from '../components/PageTitle'

const Planning = () => {
  return (
    <div className="page">
      <PageTitle status="planning" />
      <Nav />
      <MediaList status="planning" />
    </div>
  )
}

export default Planning
