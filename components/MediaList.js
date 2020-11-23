import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import humanizeDuration from 'humanize-duration'
import mediaListQuery from '../lib/gql/media-list.gql'
import { getList } from '../lib/utils'
import Loading from './Loading'
import BtnOpenInAnilist from './BtnOpenInAnilist'

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
            border: 1px solid var(--empty-border);
            color: var(--text);
            border-radius: 4px;
            font-size: 2rem;
          }
        `}</style>
      </div>
    )
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
                  <BtnOpenInAnilist siteUrl={entry.media.siteUrl} />
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
        @media (min-width: 769px) and (max-width: 1023px) {
          .media-list {
            grid-template-columns: repeat(2, 1fr);
          }
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
          border-radius: 3px;
          background-color: var(--card-background);
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
          color: var(--card-description);
          font-size: 18px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }
        .media-format {
          background: var(--card-format-background);
          color: var(--card-format-color);
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
          color: var(--card-meta);
          font-style: italic;
          font-weight: bold;
        }
        .media-meta span:not(:first-child):before {
          content: '·';
          margin: 0 5px;
        }
        .media-description {
          color: var(--card-description);
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
        .media-season {
          color: var(--card-description);
          margin-top: 10px;
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}

export default MediaList
