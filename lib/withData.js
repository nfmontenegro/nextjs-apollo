import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

function createClient({headers}) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : process.env.PRISMA_ENDPOINT,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    }
  })
}

export default withApollo(createClient)
