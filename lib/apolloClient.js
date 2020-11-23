import { ApolloClient, InMemoryCache } from '@apollo/client'

function createIsomorphLink() {
  const { HttpLink } = require('@apollo/client/link/http')
  return new HttpLink({
    uri: 'https://graphql.anilist.co',
    credentials: 'same-origin',
  })
}

export default function createApolloClient(initialState) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache().restore(initialState),
  })
}
