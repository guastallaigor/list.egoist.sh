import { useRouter } from 'next/router'
import mediaList from '../../lib/gql/media.gql'
import mediaListQuery from '../../lib/gql/media-list.gql'
import Loading from '../../components/Loading'
import { initializeApollo } from '../../lib/apollo'

export default function Anime({ pageProps }) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Loading />
  }

  return (
    <div>
      <img src={pageProps.bannerImage} alt="Banner" />
      <div>{pageProps.title.romaji}</div>
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

  const ids = Array.from(lists)
    .map((list) => list.entries.map((entries) => entries.media.id))
    .flatMap((it) => it)
    .map((it) => ({ params: { id: String(it) } }))

  return {
    paths: ids,
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: mediaList,
    variables: { id: context.params.id },
  })
  const { Media } = data

  return {
    props: {
      pageProps: Media,
      revalidate: 5000,
    },
  }
}
