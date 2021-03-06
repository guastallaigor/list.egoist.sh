import React from 'react'
import MediaList from '../components/MediaList'
import Nav from '../components/Nav'
import PageTitle from '../components/PageTitle'

const Planning = ({ theme }) => {
  return (
    <div className="page-container">
      <div className="page">
        <PageTitle status="planning" />
        <Nav theme={theme} />
        <MediaList status="planning" />
      </div>
    </div>
  )
}

export default Planning
