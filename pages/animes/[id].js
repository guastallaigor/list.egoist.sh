import { useRouter } from 'next/router'
import mediaList from '../../lib/gql/media.gql'
import mediaListQuery from '../../lib/gql/media-list.gql'
import Loading from '../../components/Loading'
import { initializeApollo } from '../../lib/apollo'

export default function Anime({ data }) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Loading />
  }

  return (
    <div>
      <img src={data.bannerImage} alt="Banner" />
      <div>{data.title.romaji}</div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: mediaListQuery,
    variables: { user: 802131, type: 'ANIME', sort: 'UPDATED_TIME_DESC' },
  })
  const { lists } = data.MediaListCollection

  const paths = Array.from(lists)
    .map((list) => list.entries.map((entries) => entries.media.id))
    .flatMap((it) => it)
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
  const { Media } = data

  return {
    props: {
      data: Media,
    },
    revalidate: 86400,
  }
}
