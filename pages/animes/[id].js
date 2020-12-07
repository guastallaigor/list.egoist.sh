import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import mediaList from '../../lib/gql/media.gql'
import mediaListQuery from '../../lib/gql/media-list.gql'
import Loading from '../../components/Loading'
import { initializeApollo } from '../../lib/apollo'
import BtnOpenInAnilist from '../../components/BtnOpenInAnilist'
import { useDarkMode } from 'next-dark-mode'

export default function Anime({ data }) {
  const { isFallback } = useRouter()

  if (isFallback) return <Loading />

  const { darkModeActive } = useDarkMode()
  const theme = darkModeActive ? 'dark' : 'light'

  return (
    <section className={`main ${theme}`}>
      <div className="banner">
        {data && data.bannerImage && (
          <Image src={data.bannerImage} alt="Banner" layout="fill" />
        )}
        <div className="shadow"></div>
      </div>
      <div className="container">
        <div className="image">
          <div>
            <Image
              src={data.coverImage.large}
              alt="Banner"
              layout="responsive"
              width={215}
              height={305}
              quality={100}
            />
          </div>
        </div>
        <main className="content">
          <div className="title">
            <h1>{data.title.romaji}</h1>
            <BtnOpenInAnilist siteUrl={data.siteUrl} />
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="left"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: data.description,
            }}
          ></div>
          <div className="list">
            <div className="list-item">
              <div className="label">Format</div>
              <div className="value">{data.format}</div>
            </div>
            <div className="list-item">
              <div className="label">Episodes</div>
              <div className="value">{data.episodes}</div>
            </div>
            <div className="list-item">
              <div className="label">Season</div>
              <div className="value">{data.season}</div>
            </div>
            <div className="list-item">
              <div className="label">Season Year</div>
              <div className="value">{data.seasonYear}</div>
            </div>
            <div className="list-item">
              <div className="label">Mean Score</div>
              <div className="value">{data.meanScore}%</div>
            </div>
            <div className="list-item">
              <div className="label">Average Score</div>
              <div className="value">{data.averageScore}%</div>
            </div>
            <div className="list-item">
              <div className="label">Popularity</div>
              <div className="value">{data.popularity}</div>
            </div>
            <div className="list-item">
              <div className="label">Start Date</div>
              <div className="value">
                {data.startDate.year}/{data.startDate.month}/
                {data.startDate.day}
              </div>
            </div>
            <div className="list-item">
              <div className="label">Genres</div>
              <div className="value">{data.genres.join(', ')}</div>
            </div>
            <div className="list-item">
              <div className="label">Tags</div>
              <div className="value">
                {data.tags.map((it) => it.name).join(', ')}
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`
        .banner {
          position: relative;
          width: 100%;
          height: 400px;
        }
        h1 {
          font-weight: 400;
          font-size: 1.5rem;
        }
        .description {
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
          max-width: 900px;
        }
        .list {
          display: flex;
          flex-flow: column nowrap;
          padding-top: 20px;
          max-width: 900px;
        }
        .list-item {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          padding-bottom: 7px;
        }
        .label {
          margin-right: 7px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .value {
          color: var(--value);
          font-size: 0.9rem;
          line-height: 1.3;
        }
        .shadow {
          background: linear-gradient(
            180deg,
            rgba(6, 13, 34, 0) 40%,
            rgba(6, 13, 34, 0.6)
          );
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
        }
        .container {
          display: grid;
          grid-column-gap: 30px;
          grid-template-columns: 215px auto;
          margin: 0 auto;
          min-width: 320px;
          padding-left: 20px;
          padding-right: 20px;
          width: 100%;
        }
        .content {
          padding-bottom: 20px;
        }
        .content > .title {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin: 20px 0;
        }
        .title > h1 {
          margin-right: 5px;
        }
        .image {
          margin-top: -125px;
          z-index: 3;
        }
        .image > div {
          background-color: rgba(212, 230, 245, 0.5);
          border-radius: 2px;
          box-shadow: 0 0 29px rgba(49, 54, 68, 0.25);
          width: 100%;
        }
        .left {
          color: var(--link);
          cursor: pointer;
          margin-left: 3px;
        }
        @media (min-width: 1540px) {
          .container {
            max-width: 1520px;
            padding-left: 100px;
            padding-right: 100px;
          }
        }
      `}</style>
    </section>
  )
}

if (!Array.prototype.flat) {
  Object.defineProperty(Array.prototype, 'flat', {
    value: function (depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat(
          Array.isArray(toFlatten) && depth > 1
            ? toFlatten.flat(depth - 1)
            : toFlatten
        )
      }, [])
    },
  })
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: mediaListQuery,
    variables: { user: 802131, type: 'ANIME', sort: 'UPDATED_TIME_DESC' },
  })

  if (!data) {
    console.warn('Data not available (paths).')
    return {
      paths: [],
      fallback: true,
    }
  }

  const { lists } = data.MediaListCollection

  const paths = Array.from(lists)
    .map((list) => list.entries.map((entries) => entries.media.id))
    .flat()
    .map((it) => ({ params: { id: String(it) } }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { id } = params
  const { data } = await apolloClient.query({
    query: mediaList,
    variables: { id },
  })

  if (!data) {
    console.warn('Data not available (props).')
    return {
      props: {
        data: [],
        initialApolloState: [],
      },
      revalidate: 60,
    }
  }

  const { Media } = data

  return {
    props: {
      data: Media,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 86400,
  }
}
