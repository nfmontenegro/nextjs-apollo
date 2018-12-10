import App, {Container} from 'next/app'
import Head from 'next/head'
import {ApolloProvider} from 'react-apollo'

import withApollo from 'Lib/withApollo'
import Navigator from './navigator'

class MyApp extends App {
  render() {
    const {Component, apolloClient, pageProps} = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>App</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
          />
        </Head>
        <Navigator />
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp)
