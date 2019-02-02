import withApollo from 'next-with-apollo'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {ApolloLink, Observable, split} from 'apollo-link'
import {onError} from 'apollo-link-error'
import {withClientState} from 'apollo-link-state'

import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'

function createClient({headers}) {
  // const networkLink = new HttpLink({
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
    credentials: 'include'
  })

  // Create a WebSocket link:
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: 'ws://localhost:4000',
        options: {
          reconnect: true
        }
      })
    : () => console.log('SSR')
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const networkLink = split(
    // split based on operation type
    ({query}) => {
      const {kind, operation} = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const myCache = new InMemoryCache()

  const request = async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include'
      },
      headers
    })
  }

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )

  return new ApolloClient({
    name: 'web',
    link: ApolloLink.from([
      onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
          console.log('GraphQL Error =>', graphQLErrors[0].message)
        }
        if (networkError) {
          console.log('there is a network error')
          // logoutUser();
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          modalOpen: false
        },
        cache: myCache
      }),
      networkLink
    ]),
    cache: myCache,
    ssrMode: true
  })
}

export default withApollo(createClient)
