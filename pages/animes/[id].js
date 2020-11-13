import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import mediaList from '../../lib/gql/media.gql'
import mediaListQuery from '../../lib/gql/media-list.gql'
import Loading from '../../components/Loading'

export default function Member({ pageProps, loading }) {
  const { isFallback } = useRouter()

  if (isFallback || loading) {
    return <Loading />
  }

  return <pre>{pageProps}</pre>
}

export const getStaticPaths = () => {
  // const mediaListResult = useQuery(mediaListQuery, {
  //   variables: { user: 802131, type: 'ANIME', sort: 'UPDATED_TIME_DESC' },
  // })
  // const { loading, data } = mediaListResult
  // const lists = data.MediaListCollection.lists

  // const ids = lists
  //   .map((list) => list.entries.map((entries) => entries.media.id))
  //   .flatMap((it) => it)

  // if (loading || !data) {
  return {
    paths: [{ params: { id: '1535' } }, { params: { id: '8131' } }],
    fallback: true,
  }
  // }

  // return {
  //   paths: ids,
  //   fallback: true,
  // }
}

export const getStaticProps = async (context) => {
  const mediaResult = await useQuery(mediaList, {
    variables: { id: context.params.id },
  })
  const { loading, data } = mediaResult

  return {
    props: {
      pageProps: data,
      loading,
    },
  }
}
