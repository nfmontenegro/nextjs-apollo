import ApolloClient from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'

function create({headers}) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : process.env.PROD,
    request: operation => {
      const token = localStorage.getItem('token')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    },
    onError: ({networkError}) => {
      if (networkError) console.log('Network Error:', networkError)
    },
    cache: new InMemoryCache()
  })
}

export default withApollo(create)
