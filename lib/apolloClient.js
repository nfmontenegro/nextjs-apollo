import fetch from 'node-fetch'
import ApolloClient from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'

const apolloClient = new ApolloClient({
  uri: process.env.NODE_ENV ? 'http://localhost:4000' : process.env.PRISMA_URL,
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
  cache: new InMemoryCache(),
  fetch
})

export default apolloClient
