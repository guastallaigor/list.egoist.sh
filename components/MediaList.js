import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import humanizeDuration from 'humanize-duration'
import mediaListQuery from '../lib/gql/media-list.gql'
import { getList } from '../lib/utils'
import Loading from './Loading'

const MediaList = ({ status, pageProps }) => {
  const router = useRouter()
  const mediaType = 'ANIME'
  const sort =
    status === 'completed'
      ? ['SCORE_DESC', 'UPDATED_TIME_DESC']
      : ['UPDATED_TIME_DESC']
  const scoreFilter = (items) => {
    const { rating } = router.query
    return items.filter((item) => {
      if (status === 'completed') {
        if (rating === 'perfect') {
          return item.score && item.score >= 9.5
        }
        if (rating === 'great') {
          return item.score && item.score >= 8.5 && item.score < 9.5
        }
        if (rating === 'good') {
          return item.score && item.score >= 7.5 && item.score < 8.5
        }
      }
      return true
    })
  }

  let data

  if (!pageProps) {
    const mediaListResult = useQuery(mediaListQuery, {
      variables: { user: 802131, type: mediaType, sort },
    })

    data = mediaListResult.data
    const { loading } = mediaListResult

    if (loading || !data) {
      return <Loading />
    }
  } else {
    data = pageProps
  }

  const list = getList(
    data.MediaListCollection.lists,
    status === 'completed'
      ? 'Completed'
      : status === 'current'
      ? mediaType === 'MANGA'
        ? 'Reading'
        : 'Watching'
      : 'Planning'
  )
  const items = scoreFilter(list.entries)
  if (items.length === 0) {
    return (
      <div className="empty-list">
        No Result
        <style jsx>{`
          .empty-list {
            padding: 50px 30px;
            text-align: center;
            border: 1px solid #e2e2e2;
            color: #666;
            border-radius: 4px;
            font-size: 2rem;
          }
        `}</style>
      </div>
    )
  }
  const openNewUrl = (siteUrl) => {
    window.open(siteUrl)
  }
  return (
    <div className="media-list">
      {items.map((entry) => {
        const useVolumes = entry.progressVolumes && entry.progressVolumes > 0
        const total =
          (useVolumes && entry.media.volumes) ||
          entry.media.chapters ||
          entry.media.episodes
        return (
          <Link
            href={{
              pathname: '/animes/[id]',
              query: { id: entry.media.id },
            }}
            scroll={false}
            target="blank"
            key={entry.media.id}
          >
            <div className="media-item">
              <div
                className="media-cover"
                style={{
                  backgroundColor: entry.media.coverImage.color,
                  backgroundImage: `url(${entry.media.coverImage.large})`,
                }}
              />
              <div className="media-content">
                <div className="media-container">
                  <div className="media-title">
                    {entry.media.title.english || entry.media.title.romaji}
                    {!/^tv/i.test(entry.media.format) && (
                      <span className="media-format">{entry.media.format}</span>
                    )}
                  </div>
                  <button
                    title="Open on Anilist"
                    onClick={(e) => {
                      e.preventDefault()
                      openNewUrl(entry.media.siteUrl)
                    }}
                    className="media-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 100"
                      width="15"
                      height="15"
                      className="external-link-icon"
                    >
                      <path
                        fill="currentColor"
                        d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                      />{' '}
                      <polygon
                        fill="currentColor"
                        points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                      />
                    </svg>
                  </button>
                </div>
                <div className="media-meta">
                  {entry.score ? (
                    <span className="media-score">Score: {entry.score}</span>
                  ) : null}
                  {status === 'current' && (
                    <span className="media-progress">
                      {mediaType === 'MANGA' ? 'Read' : 'Watched'}{' '}
                      {useVolumes ? entry.progressVolumes : entry.progress}
                      {total ? `/${total}` : ''}{' '}
                      {useVolumes ? 'Volumes' : 'Episodes'}
                    </span>
                  )}
                  {entry.media.nextAiringEpisode && (
                    <span className="media-date">
                      Next Episode in{' '}
                      {humanizeDuration(
                        entry.media.nextAiringEpisode.timeUntilAiring * 1000,
                        { largest: 1 }
                      )}
                    </span>
                  )}
                </div>
                <div
                  className="media-description"
                  dangerouslySetInnerHTML={{
                    __html: entry.media.description,
                  }}
                />
                {entry.media.season && entry.media.seasonYear && (
                  <div className="media-season">
                    ({entry.media.seasonYear}{' '}
                    <span style={{ textTransform: 'capitalize' }}>
                      {entry.media.season.toLowerCase()}
                    </span>{' '}
                    Season)
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}
      <style jsx>{`
        .media-list {
          display: grid;
          grid-template-columns:
            calc((100% - 40px) / 3) calc((100% - 40px) / 3)
            calc((100% - 40px) / 3);
          grid-gap: 20px;
        }
        @media (max-width: 768px) {
          .media-list {
            grid-template-columns: 100%;
          }
        }
        .media-container {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-between;
        }
        .media-item {
          display: flex;
          font-size: 16px;
          text-decoration: none;
          padding: 10px;
          color: #000;
          border-radius: 3px;
          background-color: #fff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
        }
        .media-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
            0 5px 15px 0 rgba(0, 0, 0, 0.08);
        }
        .media-title {
          font-size: 18px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }
        .media-format {
          background: #0366d6;
          color: white;
          border-radius: 4px;
          padding: 0 5px;
          margin-left: 10px;
          font-size: 11px;
          height: 20px;
          line-height: 20px;
        }
        .media-meta {
          margin-bottom: 5px;
          font-size: 13px;
          color: #03a9f4;
          font-style: italic;
          font-weight: bold;
        }
        .media-meta span:not(:first-child):before {
          content: '·';
          margin: 0 5px;
        }
        .media-description {
          color: #999;
          font-size: 14px;
        }
        .media-cover {
          height: 140px;
          width: 100px;
          background-size: cover;
          margin-right: 20px;
        }
        .media-content {
          width: calc(100% - 120px);
        }
        .media-description {
          max-height: 150px;
          overflow: auto;
        }
        .media-button {
          background: transparent;
          border: 0;
          color: #067df7;
        }
        .media-button:hover {
          opacity: 0.75;
        }
        .media-season {
          color: #999;
          margin-top: 10px;
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}

export default MediaList
