import Head from 'next/head'
import Link from 'next/link'

const PageTitle = ({ status }) => {
  const title = `@guastallaigor ${
    status === 'completed'
      ? 'Completed'
      : status === 'current'
      ? 'Watching'
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
