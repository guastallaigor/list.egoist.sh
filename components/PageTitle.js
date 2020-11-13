import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PageTitle = ({ status }) => {
  const router = useRouter()
  const title = `@guastallaigor ${
    status === 'completed'
      ? 'Completed'
      : status === 'current'
      ? router.query.type === 'manga'
        ? 'Reading'
        : 'Watching'
      : 'Planning'
  } List`
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="page-title">
        <Link href="/">
          <a>{title}</a>
        </Link>
      </h1>
    </>
  )
}

export default PageTitle
