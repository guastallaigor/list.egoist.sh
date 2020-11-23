import Link from 'next/link'
import { useRouter } from 'next/router'
import GitHub from './GitHub'
import ToggleDarkMode from './ToggleDarkMode'

const Nav = () => {
  const router = useRouter()
  const queryWithout = (keys) => {
    const query = {}
    for (const key of Object.keys(router.query)) {
      if (keys.indexOf(key) === -1) {
        query[key] = router.query[key]
      }
    }
    return query
  }
  return (
    <>
      <GitHub />
      <nav>
        <ul>
          <li>
            <Link href={{ pathname: '/', query: queryWithout(['rating']) }}>
              <a className={router.pathname === '/' ? 'active' : null}>
                {router.query.type === 'manga' ? 'Reading' : 'Watching'}
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: '/planning', query: queryWithout(['rating']) }}
            >
              <a className={router.pathname === '/planning' ? 'active' : null}>
                Planning
              </a>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: '/completed', query: router.query }}>
              <a className={router.pathname === '/completed' ? 'active' : null}>
                Completed
              </a>
            </Link>
          </li>
          <li>
            <a href="https://anilist.co/user/guastallaigor" target="blank">
              My AniList
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
            </a>
          </li>
          <li>
            <ToggleDarkMode />
          </li>
        </ul>
        <div className="options">
          {router.pathname === '/completed' && (
            <select
              defaultValue={router.query.rating || 'all'}
              onChange={(e) =>
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, rating: e.target.value },
                })
              }
            >
              <option value="all">Rating: All</option>
              <option value="perfect">Rating: Perfect</option>
              <option value="great">Rating: Great</option>
              <option value="good">Rating: Good</option>
            </select>
          )}
        </div>
        <style jsx>{`
          nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0;
          }
          .options > * {
            margin-left: 10px;
          }
          select {
            appearance: none;
            border: 1px solid var(--border-select);
            padding: 5px 10px;
            color: var(--color-select);
            background-color: var(--background-select);
            border-radius: 3px;
            transition: border 0.2s ease-in-out;
          }
          select:hover {
            border-color: var(--border-hover-select);
          }
          ul {
            margin: 0;
            list-style: none;
            padding-left: 0;
            display: flex;
          }
          li {
            margin-right: 20px;
          }
          a {
            color: var(--nav-link);
            transition: color 0.2s ease-in-out;
          }
          a:hover {
            color: var(--nav-link-hover);
          }
          a.active {
            color: var(--nav-link-active);
          }
          .external-link-icon {
            color: var(--nav-link);
            margin-left: 3px;
          }
          @media screen and (max-width: 768px) {
            .options {
              display: none;
            }
          }
        `}</style>
      </nav>
    </>
  )
}

export default Nav
